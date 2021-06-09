# mongo-project

[![Build Status](https://travis-ci.com/patrickd-/mongo-project.node.svg?branch=master)](https://travis-ci.com/patrickd-/mongo-project.node) [![Coverage Status](https://coveralls.io/repos/github/patrickd-/mongo-project.node/badge.svg)](https://coveralls.io/github/patrickd-/mongo-project.node) [![Dependencies Status](https://david-dm.org/patrickd-/mongo-project.node.svg)](https://david-dm.org/patrickd-/mongo-project.node)

Simplified [MongoDB style projection](https://docs.mongodb.com/manual/reference/method/db.collection.find/#projection) for hiding/showing specific fields.

```
npm install mongo-project
```

## Usage

### Hide some fields from an object

```javascript
const project = require('mongo-project');

const object = {
  title: 'Bar title',
  author: {
    name: 'Foo Person',
    email: 'foo.person@example.com',
  },
};

const projectedObject = project(object, {
  'author.email': 0,
});

console.dir(projectedObject);
// {
//   title: 'Bar title',
//   author: {
//     name: 'Foo Person'
//   }
// }
```

### Only show specific fields of an object

```javascript
const project = require('mongo-project');

const object = {
  title: 'Bar title',
  author: {
    name: 'Foo Person',
    email: 'foo.person@example.com',
  },
};

const projectedObject = project(object, {
  'title': 1,
  'author.name': 1,
});

console.dir(projectedObject);
// {
//   title: 'Bar title',
//   author: {
//     name: 'Foo Person'
//   }
// }
```

### More complex examples can be found in the [tests](test/projectSpec.js).

### $, $elemMatch, $slice, $meta

The [operators of MongoDBs](https://docs.mongodb.com/manual/reference/method/db.collection.find/#projection) projection are not supported.
