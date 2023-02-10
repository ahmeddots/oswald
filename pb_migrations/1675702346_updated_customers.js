migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ezqx39gtro3n2m6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xsoqu3nf",
    "name": "adress",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 5,
      "max": 50,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ezqx39gtro3n2m6")

  // remove
  collection.schema.removeField("xsoqu3nf")

  return dao.saveCollection(collection)
})
