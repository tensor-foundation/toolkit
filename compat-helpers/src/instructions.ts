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
            role == AccountRole.WRITABLE || AccountRole.WRITABLE_SIGNER,
        } as AccountMeta;
      });
  const programId = new PublicKey(instruction.programAddress);
  const data = instruction.data ? Buffer.from(instruction.data) : undefined;
  return new TransactionInstruction({
    keys,
    programId,
    data,
  });
}
