import { ProviderCryptography } from "@poke/core";
import * as bcrypt from 'bcryptjs';


export class BcryptProvider implements ProviderCryptography {
    async cryptography(password: string): Promise<string> {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    }
    async compare(password: string, hashedPassword: string): Promise<boolean> {
      return bcrypt.compare(password, hashedPassword);
    }
  }
  