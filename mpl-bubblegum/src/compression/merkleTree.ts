import { keccak_256 } from 'js-sha3';
import * as Collections from 'typescript-collections';

export type TreeNode = {
    id: number;
    left: TreeNode | undefined;
    level: number;
    node: Buffer;
    parent: TreeNode | undefined;
    right: TreeNode | undefined;
};

export type MerkleTreeProof = {
    leaf: Buffer;
    leafIndex: number;
    proof: Buffer[];
    root: Buffer;
};

export class MerkleTree {
    leaves: TreeNode[];
    root: Buffer;
    depth: number;

    constructor(leaves: Buffer[]) {
        const [nodes, finalLeaves] = buildLeaves(leaves);
        let seqNum = leaves.length;

        while (nodes.size() > 1) {
            const left = nodes.dequeue()!;
            const level = left.level;

            let right: TreeNode;
            if (level != nodes.peek()!.level) {
                right = emptyTreeNode(level, seqNum);
                seqNum++;
            } else {
                right = nodes.dequeue()!;
            }

            const parent: TreeNode = {
                id: seqNum,
                left: left,
                level: level + 1,
                node: hash(left.node, right.node),
                parent: undefined,
                right: right,
            };
            left.parent = parent;
            right.parent = parent;
            nodes.enqueue(parent);
            seqNum++;
        }

        this.leaves = finalLeaves;
        this.root = nodes.peek()!.node;
        this.depth = nodes.peek()!.level + 1;
    }


    getProof(leafIndex: number, minimizeProofHeight = false, treeHeight = -1, verbose = false) {
        const proof: TreeNode[] = [];

        let node = this.leaves[leafIndex];

        let height = 0;
        while (typeof node.parent !== 'undefined') {
            if (minimizeProofHeight && height >= treeHeight) {
                break;
            }
            if (verbose) {
                console.log(`${node.level}: ${Uint8Array.from(node.node)}`);
            }
            const parent = node.parent;
            if (parent.left!.id === node.id) {
                proof.push(parent.right!);
                console.log(`${node.level}: proof => ${Uint8Array.from(parent.right!.node)}`);

                const hashed = hash(node.node, parent.right!.node);
                if (!hashed.equals(parent.node)) {
                    console.log(hashed);
                    console.log(parent.node);
                    throw new Error('Invariant broken when hashing left node');
                }
            } else {
                proof.push(parent.left!);
                console.log(`${node.level}: proof => ${Uint8Array.from(parent.left!.node)}`);

                const hashed = hash(parent.left!.node, node.node);
                if (!hashed.equals(parent.node)) {
                    console.log(hashed);
                    console.log(parent.node);
                    throw new Error('Invariant broken when hashing right node');
                }
            }
            node = parent;
            height++;
        }

        return {
            proof: proof.map(treeNode => treeNode.node),
        };
    }
}


export function sparseMerkleTreeFromLeaves(leaves: Buffer[], depth: number): MerkleTree {
    const _leaves: Buffer[] = [];
    for (let i = 0; i < 2 ** depth; i++) {
        if (i < leaves.length) {
            _leaves.push(leaves[i]);
        } else {
            _leaves.push(Buffer.alloc(32));
        }
    }
    return new MerkleTree(_leaves);
}
const CACHE_EMPTY_NODE = new Map<number, Buffer>();
const LEAF_BUFFER_LENGTH = 32;

function emptyNode(level: number): Buffer {
    if (CACHE_EMPTY_NODE.has(level)) {
        return CACHE_EMPTY_NODE.get(level)!;
    }
    if (level == 0) {
        return Buffer.alloc(32);
    }

    const result = hash(emptyNode(level - 1), emptyNode(level - 1));
    CACHE_EMPTY_NODE.set(level, result);
    return result;
}
function emptyTreeNode(level: number, id: number): TreeNode {
    return {
        id,
        left: undefined,
        level: level,
        node: emptyNode(level),
        parent: undefined,
        right: undefined,
    };
}

function buildLeaves(leaves: Buffer[]): [Collections.Queue<TreeNode>, TreeNode[]] {
    const nodes = new Collections.Queue<TreeNode>();
    const finalLeaves: TreeNode[] = [];
    leaves.forEach((buffer, index) => {
        if (buffer.length != LEAF_BUFFER_LENGTH) {
            throw Error(
                `Provided leaf has length: ${buffer.length}, but we need all leaves to be length ${LEAF_BUFFER_LENGTH}`,
            );
        }

        const treeNode = {
            id: index,
            left: undefined,
            level: 0,
            node: buffer,
            parent: undefined,
            right: undefined,
        };
        nodes.enqueue(treeNode);
        finalLeaves.push(treeNode);
    });
    return [nodes, finalLeaves];
}

function hash(left: Buffer, right: Buffer): Buffer {
    return Buffer.from(keccak_256.digest(Buffer.concat([left, right])));
}
