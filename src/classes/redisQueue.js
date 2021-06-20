// Classes
const redisDB = require('../connection/redis');

// Enums
const QueueStatus = Object.freeze({
    stopped: 0,
    running: 1
})
class redisQueue extends redisDB {
    constructor(queueName, queueLimit, limitInterval, redisConfig) {
        if (!queueName) throw new Error(`Please provide a valid queue name`);

        super(redisConfig)
        this.qName = queueName;
        this.queueLimit = queueLimit;
        this.currentLimit = queueLimit;
        this.limitInterval = limitInterval;
        this.status = QueueStatus.stopped
        this.start();
        this.limitInterval && this.interval()
    }

    get availabaleStatus() { return QueueStatus }
    // To start a queue, set status to running and monitor queue for any incoming messages to procceed
    async start() {
        if (this.status == QueueStatus.running)
            return;
        this.status = QueueStatus.running;
        let msg = '';
        do {
            try {
                msg = await this.bzpopmin(this.qName, 0); // Monitor queue forever
                console.log(`new message consumeddd from ${this.qName} queue `, msg)
                // Proceed only on incoming message and re-monitor for next
                msg = msg[1]// msg:>> [queueName, msgContent]
                this.onMessage(msg);
                this.queueLimit && this.checkQueueLimit();
            } catch (error) {
                await this.handleQueueErrors(msg, error)
            }
        } while (this.status == QueueStatus.running);

    }

    // Change status to stopped will cause to break the do-while whic monitors for income message
    stop() {
        if (this.status != QueueStatus.stopped) {
            this.status = QueueStatus.stopped;
            console.log('[', new Date(new Date() + 'UTC'), ']', `${this.qName} has been stopped monitoring`);
        }
    }

    async onMessage(msg) {
        console.log("Message Received", msg)
    }

    async handleQueueErrors(msg, err) {
        console.error(`Unresolved Error on ${this.qName} ${msg}: ${err.message} ${err.stack}`)
    }

    checkQueueLimit() {
        if (!--this.queueLimit) this.stop();
    }

    interval() {
        setInterval(() => {
            this.currentLimit = this.queueLimit;
            this.status = QueueStatus.stopped && this.start();
        }, this.limitInterval)
    }
}


module.exports = redisQueue;
