const localStorageWatchKey = "movie-watched";
const localQueueWatchKey = "movie-queue";

export let movieLocalStorage = {
    watchedArray : localStorageLoad(localStorageWatchKey),
    queueArray : localStorageLoad(localQueueWatchKey),
    watchedExists : function(id) {
        return this.indexById(this.watchedArray, id) != -1;
    },
    queueExists : function(id){
        return this.indexById(this.queueArray, id) != -1;
    },
    indexById : function(array, id){
        return array.findIndex(movie => movie.id == id);
    },
    addWatched : function(movie) {
        if(!this.queueExists(movie.id)){
            if(!this.watchedExists(movie.id)){
                this.watchedArray.push(movie);
                localStorageSave(localStorageWatchKey, this.watchedArray);
                return true;  
            }
        }
        return false;
    },
    removeWatched : function(id){
        if(this.watchedExists(id)){
            let index = this.indexById(this.watchedArray, id);
            this.watchedArray.splice(index, 1);
            localStorageSave(localStorageWatchKey, this.watchedArray);
        }
    },
    addQueue : function(movie) {
        if(!this.watchedExists(movie.id)){
            if(!this.queueExists(movie.id)){
                this.queueArray.push(movie);
                localStorageSave(localQueueWatchKey, this.queueArray);
                return true;
            }
        }
        return false;
    },
    removeQueue : function(id){
        if(this.queueExists(id)){
            let index = this.indexById(this.queueArray, id);
            this.queueArray.splice(index, 1);
            localStorageSave(localQueueWatchKey, this.queueArray);
        }
    },
};

function localStorageLoad(key){
    let movieListValue = localStorage.getItem(key);
    let movieList = [];
    if(movieListValue !== null){
        movieList = JSON.parse(movieListValue);
    }
    return movieList;
}

function localStorageSave(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

