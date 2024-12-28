export interface ITokenRepository {
    generate(size?: number): string;
}