export default interface ProviderCryptography {
  cryptography(password: string): Promise<string>;
  compare(password: string, passwordCrypy: string): Promise<boolean>;
}
