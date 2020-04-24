import { Repository, EntityRepository } from 'typeorm';
import { KeyValue } from './keyvalue.entity';

@EntityRepository(KeyValue)
export class KeyValueRepository extends Repository<KeyValue> {
  async findByKey(key: string) {
    return this.findOne({
      key,
    });
  }
}
