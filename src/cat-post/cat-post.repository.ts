import { EntityRepository, Repository } from 'typeorm';
import { CatPost } from './cat-post.entity';

@EntityRepository(CatPost)
export class CatPostRepository extends Repository<CatPost> {}
