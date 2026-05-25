import { Injectable } from '@nestjs/common';
import fs from 'fs/promises';
import path from 'path';

import { OnofficeService } from '../onoffice/onoffice.service';
import { UpdateOnOfficeCredentialsDto } from './dto/update-onoffice-credentials.dto';
import { SyncOnOfficeProductsDto } from '../onoffice/dto/syncOnOfficeProducts.dto';

@Injectable()
export class CrmService {
  constructor(private readonly onofficeService: OnofficeService) {}

  syncProducts(syncDto: SyncOnOfficeProductsDto) {
    return this.onofficeService.syncFromOnOffice(syncDto);
  }

  // async updateOnOfficeCredentials(dto: UpdateOnOfficeCredentialsDto) {
  //   const updates: Record<string, string> = {};

  //   if (dto.token || dto.estateToken)
  //     updates['ONOFFICE_ESTATE_TOKEN'] = dto.estateToken ?? dto.token!;
  //   if (dto.secret || dto.estateSecret)
  //     updates['ONOFFICE_ESTATE_SECRET'] = dto.estateSecret ?? dto.secret!;
  //   if (dto.token || dto.pictureToken)
  //     updates['ONOFFICE_PICTURE_TOKEN'] = dto.pictureToken ?? dto.token!;
  //   if (dto.secret || dto.pictureSecret)
  //     updates['ONOFFICE_PICTURE_SECRET'] = dto.pictureSecret ?? dto.secret!;

  //   const envPath = path.join(process.cwd(), '.env');
  //   let envContent = await fs.readFile(envPath, 'utf8');

  //   for (const [key, value] of Object.entries(updates)) {
  //     process.env[key] = value;
  //     envContent = this.upsertEnvValue(envContent, key, value);
  //   }

  //   await fs.writeFile(envPath, envContent);
  //   console.log(Object.keys(updates));
  //   return { updatedKeys: Object.keys(updates) };
  // }

  async updateOnOfficeCredentials(dto: UpdateOnOfficeCredentialsDto) {
    const updates: Record<string, string> = {};

    if (dto.token || dto.estateToken)
      updates['ONOFFICE_ESTATE_TOKEN'] = dto.estateToken ?? dto.token!;
    if (dto.secret || dto.estateSecret)
      updates['ONOFFICE_ESTATE_SECRET'] = dto.estateSecret ?? dto.secret!;
    if (dto.token || dto.pictureToken)
      updates['ONOFFICE_PICTURE_TOKEN'] = dto.pictureToken ?? dto.token!;
    if (dto.secret || dto.pictureSecret)
      updates['ONOFFICE_PICTURE_SECRET'] = dto.pictureSecret ?? dto.secret!;

    const envPath = path.join(process.cwd(), '.env');
    let envContent = await fs.readFile(envPath, 'utf8');

    for (const [key, value] of Object.entries(updates)) {
      process.env[key] = value;
      envContent = this.upsertEnvValue(envContent, key, value);
    }

    await fs.writeFile(envPath, envContent);

    // Response এ details দেখাও
    const updatedDetails = Object.entries(updates).map(([key, value]) => ({
      key,
      preview: value.substring(0, 8) + '...', // security জন্য full value না দেখিয়ে শুধু প্রথম 8 char
    }));

    return {
      updatedKeys: Object.keys(updates),
      updatedDetails,
      updatedAt: new Date(),
      message: `${Object.keys(updates).length} credentials updated in .env`,
    };
  }

  private upsertEnvValue(content: string, key: string, value: string) {
    const pattern = new RegExp(`^${key}=.*$`, 'm');
    const line = `${key}=${value}`;
    return pattern.test(content)
      ? content.replace(pattern, line)
      : `${content.trimEnd()}\n${line}\n`;
  }
}
