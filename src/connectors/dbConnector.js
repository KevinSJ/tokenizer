import loki from 'lokijs';

const db = new loki('token');

const tokenCollection = db.addCollection('tokens', {
  autoupdate: true,
});

export { tokenCollection };
