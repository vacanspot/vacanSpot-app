import Realm, {ObjectSchema} from 'realm';

class ImageSchema extends Realm.Object<ImageSchema> {
  _id!: Realm.BSON.ObjectId;
  path!: string;
  static schema: ObjectSchema = {
    name: 'Image',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      path: 'string',
    },
  };
}

export default ImageSchema;
