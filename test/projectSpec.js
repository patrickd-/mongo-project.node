/* eslint import/no-extraneous-dependencies:["error",{"devDependencies":true}]*/
const expect = require('chai').expect;
const project = require('../lib/project');

describe('project()', () => {

  const object = {
    title: 'Bar title',
    tags: ['foo', 'bar'],
    content: {
      message: 'Foo bar!',
    },
    authors: [
      {
        name: 'Foo Person',
        email: 'foo.person@example.com',
      },
      {
        name: 'Bar Person',
        email: 'bar.person@example.com',
      },
    ],
  };

  it('should only keep the specified scalar value fields', () => {
    expect(project(object, {
      title: 1,
      tags: 1,
    })).to.deep.equal({
      title: 'Bar title',
      tags: ['foo', 'bar'],
    });
  });

  it('should remove the specified scalar value fields', () => {
    expect(project(object, {
      title: 0,
      tags: 0,
    })).to.deep.equal({
      content: {
        message: 'Foo bar!',
      },
      authors: [
        {
          name: 'Foo Person',
          email: 'foo.person@example.com',
        },
        {
          name: 'Bar Person',
          email: 'bar.person@example.com',
        },
      ],
    });
  });

  it('should only keep contents of nested value fields', () => {
    expect(project(object, {
      content: 1,
      authors: 1,
    })).to.deep.equal({
      content: {
        message: 'Foo bar!',
      },
      authors: [
        {
          name: 'Foo Person',
          email: 'foo.person@example.com',
        },
        {
          name: 'Bar Person',
          email: 'bar.person@example.com',
        },
      ],
    });
  });

  it('should only keep specified nested field values', () => {
    expect(project(object, {
      'content.message': 1,
      'authors.name': 1,
    })).to.deep.equal({
      content: {
        message: 'Foo bar!',
      },
      authors: [
        {
          name: 'Foo Person',
        },
        {
          name: 'Bar Person',
        },
      ],
    });
  });

  it('should remove nested value fields if specified', () => {
    expect(project(object, {
      content: 0,
      authors: 0,
    })).to.deep.equal({
      title: 'Bar title',
      tags: ['foo', 'bar'],
    });
  });

  it('should remove specified fields within nested values', () => {
    expect(project(object, {
      'content.message': 0,
      'authors.email': 0,
    })).to.deep.equal({
      title: 'Bar title',
      tags: ['foo', 'bar'],
      content: {},
      authors: [
        {
          name: 'Foo Person',
        },
        {
          name: 'Bar Person',
        },
      ],
    });
  });

  it('should be fine with recursions', () => {
    const recob = {};
    recob.rec = recob;
    expect(project(recob, {
      recob: 1,
    })).to.deep.equal({
      rec: recob,
    });
  });

  it('should be fine with unknown object type references', () => {
    const mapob = { map: new Map() };
    expect(project(mapob, {
      map: 1,
    })).to.deep.equal({
      map: mapob.map,
    });
  });

});
