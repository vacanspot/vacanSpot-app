import Realm, {ObjectSchema} from 'realm';

class FavoriteSchema extends Realm.Object<FavoriteSchema> {
  _id!: Realm.BSON.ObjectId;
  path!: string;
  static schema: ObjectSchema = {
    name: 'Favorite',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      path: 'string',
    },
  };
}

export default FavoriteSchema;
