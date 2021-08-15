class Listener {
    constructor(playlistService, mailSender){
        this._playlistService = playlistService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message){
        try{
            const {playlistId, targetEmail} = JSON.parse(message.content.toString());

            const playlistListener = await this._playlistService.getPlaylist(playlistId);
            const resultListener = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlistListener));
            console.log(resultListener);
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = Listener;