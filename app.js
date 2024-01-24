const {Logger, userName} = require('./js/log');

// emitter.on('some_events', (arg) => {
//     const {id, key} = arg;
//     console.log(id, key);
// });

// emitter.emit('some_events', {id: 1, key: 'EVENT'});

//log('Test log');

const logger = new Logger();

logger.on('some_events', (arg)=> {
    const {id, key} = arg;
    console.log(id, key, userName);
}).log('Test ' + userName);