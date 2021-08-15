const {Pool} = require('pg');

class PlaylistService{
    constructor(){
        this._pool = new Pool();
    }

    async getSongs(userId){
        const getQuery = {
            text: `SELECT songs.id, songs.title, songs.performer FROM songs
            LEFT JOIN playlistsongs ON playlistsongs.song_id = songs.id
            WHERE playlistsongs.playlist_id = $1
            GROUP BY songs.id`,
            values: [playlistId],
        };
        const getResult = await this._pool.query(getQuery);
        return getResult.rows;
    }
}

module.exports = PlaylistService;
