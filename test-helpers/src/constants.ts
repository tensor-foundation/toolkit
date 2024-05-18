/**
 * Lamports in one Sol.
 */
export const LAMPORTS_PER_SOL = 1_000_000_000n;

/**
 * Rent-exempt reserve for new accounts.
 */
export const ZERO_ACCOUNT_RENT_LAMPORTS = 890880n;

/**
 * Lamports in one Sol.
 */
export const ONE_SOL = 1n * LAMPORTS_PER_SOL;

/**
 * Creates a lamports value from a sol value.
 */
export const sol = (amount: number) => amount * Number(LAMPORTS_PER_SOL);
