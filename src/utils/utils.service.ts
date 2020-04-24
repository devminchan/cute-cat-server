import { Injectable } from '@nestjs/common';
import { KeyValueRepository } from './keyvalue.repsitory';

@Injectable()
export class UtilsService {
  constructor(private readonly keyvalueRepository: KeyValueRepository) {}

  async storeKeyValue(key: string, value: string) {
    const kv = await this.keyvalueRepository.findByKey(key);

    if (kv) {
      kv.value = value;
      return await this.keyvalueRepository.save(kv);
    } else {
      const newKv = this.keyvalueRepository.create({
        key,
        value,
      });

      return await this.keyvalueRepository.save(newKv);
    }
  }

  async getValueByKey(key: string) {
    const kv = await this.keyvalueRepository.findByKey(key);

    return kv.value;
  }
}
