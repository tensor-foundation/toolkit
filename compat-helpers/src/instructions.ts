import {
  AccountMeta,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';
import {
  IInstruction,
  AccountRole,
  IAccountLookupMeta,
  IAccountMeta,
  address,
  Address,
} from '@solana/web3.js-next';

interface IInstructionWithStringProgramAddress<
  TAccounts extends readonly (IAccountLookupMeta | IAccountMeta)[] = readonly (
    | IAccountLookupMeta
    | IAccountMeta
  )[],
> extends Omit<IInstruction<string, TAccounts>, 'programAddress'> {
  readonly programAddress: string;
}
export function fromIInstructionToTransactionInstruction(
  instruction: IInstruction | IInstructionWithStringProgramAddress
): TransactionInstruction {
  const keys: Array<AccountMeta> = !instruction.accounts
    ? []
    : instruction.accounts.map(({ address, role }) => {
        return {
          pubkey: new PublicKey(address),
          isSigner:
            role == AccountRole.READONLY_SIGNER ||
            role == AccountRole.WRITABLE_SIGNER,
          isWritable:
            role == AccountRole.WRITABLE || role == AccountRole.WRITABLE_SIGNER,
        } as AccountMeta;
      });
  const programId = new PublicKey(instruction.programAddress);
  const data = instruction.data
    ? Buffer.from(instruction.data)
    : Buffer.alloc(0);
  return new TransactionInstruction({
    keys,
    programId,
    data,
  });
}

export function fromTransactionInstructionToIInstruction(
  instruction: TransactionInstruction
): IInstruction {
  const accounts: IAccountMeta[] = instruction.keys.map((key: AccountMeta) => {
    return {
      address: address(key.pubkey.toString()),
      role: (Number(key.isSigner) << 1) | Number(key.isWritable), // 2 bits - Writable LSB, Signer MSB
    } as IAccountMeta;
  });
  const data: Uint8Array = new Uint8Array(instruction.data);
  const programAddress: Address = address(instruction.programId.toString());
  return {
    accounts: accounts,
    programAddress: programAddress,
    data: data,
  };
}
