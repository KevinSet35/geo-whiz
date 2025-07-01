/**
 * Array utility functions
 */

/**
 * Shuffles an array using the Fisher-Yates algorithm
 * @param array - The array to shuffle
 * @returns A new shuffled array (does not mutate the original)
 */
export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i]!, shuffled[j]!] = [shuffled[j]!, shuffled[i]!];
    }
    return shuffled;
}

/**
 * Selects random elements from an array
 * @param array - The source array
 * @param count - Number of elements to select
 * @returns A new array with randomly selected elements
 */
export function selectRandomElements<T>(array: T[], count: number): T[] {
    return shuffleArray(array).slice(0, count);
}

/**
 * Gets a random element from an array
 * @param array - The source array
 * @returns A random element from the array, or undefined if array is empty
 */
export function getRandomElement<T>(array: T[]): T | undefined {
    if (array.length === 0) return undefined;
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Chunks an array into smaller arrays of specified size
 * @param array - The source array
 * @param size - The size of each chunk
 * @returns An array of chunks
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}