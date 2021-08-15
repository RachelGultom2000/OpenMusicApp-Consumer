require('dotenv').config();
const amqp = require('amqplib');
const PlaylistService = require('./PlaylistService');
const MailSender = require('./MailSender');
const Listener = require('./Listener');

const init =  async () => {
    const playlistService = new PlaylistService();
    const mailSender = new MailSender();
    const listener = new Listener(playlistService,mailSender);

    const consumerConnection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const consumerChannel = await consumerConnection.createChannel();

    await consumerChannel.assertQueue('export:playlist',{
        durable: true,
    });

    channel.consume('export:playlist',listener.listen,{ noAck: true });
};

init();