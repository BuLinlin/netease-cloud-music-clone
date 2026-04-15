import { defineStore } from 'pinia'
export const usePlayMusicStore = defineStore('playMusic', {
    // 全局存储播放信息
    state: () => ({
        // 当前播放的音乐信息
        currentMusic: null,
        // 播放列表
        playList: [],
        // 当前播放歌曲在列表中的索引
        currentIndex: -1,
        // 当前播放的状态：true 为播放中，false 为暂停
        isPlaying: false,
        // 音量大小：0-1
        volume: 0.7,
        // 当前播放进度：秒
        currentTime: 0,
        // 歌曲总时长：秒
        duration: 0
    }),
    // 定义 actions，用于更新播放信息
    actions: {
        /**
         * 设置当前播放的音乐
         * @param {Object} music - 音乐信息对象
         */
        setCurrentMusic(music) {
            this.currentMusic = music
        },
        /**
         * 设置播放列表
         * @param {Array} list - 音乐列表
         */
        setPlayList(list) {
            this.playList = list
        },
        /**
         * 添加音乐到播放列表
         * @param {Object} music - 音乐信息对象
         */
        addMusic(music) {
            this.playList.push(music)
        },
        /**
         * 从播放列表移除音乐
         * @param {number} index - 歌曲索引
         */
        removeMusic(index) {
            if (index >= 0 && index < this.playList.length) {
                this.playList.splice(index, 1)
                // 如果移除的是当前播放的歌曲，需要处理
                if (index === this.currentIndex) {
                    if (this.playList.length > 0) {
                        this.currentIndex = Math.min(index, this.playList.length - 1)
                        this.currentMusic = this.playList[this.currentIndex]
                    } else {
                        this.currentIndex = -1
                        this.currentMusic = null
                        this.isPlaying = false
                    }
                } else if (index < this.currentIndex) {
                    // 如果移除的是当前歌曲之前的歌曲，索引减1
                    this.currentIndex--
                }
            }
        },
        /**
         * 清空播放列表
         */
        clearPlayList() {
            this.playList = []
            this.currentIndex = -1
            this.currentMusic = null
            this.isPlaying = false
        },
        /**
         * 播放下一首
         */
        playNext() {
            if (this.playList.length === 0) return
            this.currentIndex = (this.currentIndex + 1) % this.playList.length
            this.currentMusic = this.playList[this.currentIndex]
            this.isPlaying = true
        },
        /**
         * 播放上一首
         */
        playPrev() {
            if (this.playList.length === 0) return
            this.currentIndex = (this.currentIndex - 1 + this.playList.length) % this.playList.length
            this.currentMusic = this.playList[this.currentIndex]
            this.isPlaying = true
        },
        /**
         * 播放指定索引的歌曲
         * @param {number} index - 歌曲索引
         */
        playAtIndex(index) {
            if (index >= 0 && index < this.playList.length) {
                this.currentIndex = index
                this.currentMusic = this.playList[index]
                this.isPlaying = true
            }
        },
        /**
         * 设置播放状态
         * @param {boolean} status - 播放状态
         */
        setPlaying(status) {
            this.isPlaying = status
        },
        /**
         * 设置音量
         * @param {number} volume - 音量大小（0-1）
         */
        setVolume(volume) {
            this.volume = Math.max(0, Math.min(1, volume))
        },
        /**
         * 设置当前播放进度
         * @param {number} time - 当前播放进度（秒）
         */
        setCurrentTime(time) {
            this.currentTime = time
        },
        /**
         * 设置歌曲总时长
         * @param {number} duration - 歌曲总时长（秒）
         */
        setDuration(duration) {
            this.duration = duration
        },
    },
})