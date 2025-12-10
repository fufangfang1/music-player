<template>
  <div id="app">
    <!-- 头部 -->
    <div class="wrapper">
       <div class="user">
        <img src="@/assets/avator.jpg" alt="" />
      </div>
     
        <div class="logo">
        <img class="music_img" src="@/assets/up-logo.png" alt="" />
      </div>
    
    </div>

    <!-- 主体卡片 -->
    <el-card class="box-card">
      <!-- 分类标签 -->
      <ul class="music_content">
        <li
          v-for="(item, index) in typeMusicList"
          :key="index"
          class="music_name"
          :class="{ active: activeTypeIndex === index }"
          @click="changeType(index)"
        >
          {{ item.name }}
        </li>
      </ul>

      <!-- 歌曲列表 -->
      <div class="music">
        <div class="music_list">
          <!-- 空列表提示 -->
          <div v-if="filteredSongs.length == 0" class="empty-tip">
            現在のカテゴリーに曲がありません
          </div>
          <!-- 歌曲项：仅保留播放图标，无audio控件 -->
          <div
            v-else
            v-for="(song, index) in filteredSongs"
            :key="song.id"
            class="song-item"
          >
            <div class="name-img">
              <div class="song-name" @click="playSong(song, index)">
                {{ song.name }}
              </div>
              <!-- 播放状态标识（gif动图） -->
              <img v-if="currentPlayingId == song.id&&isPlaying" class="song-img" src="@/assets/music-playing.gif" alt="播放中" />
            </div>

            <!-- 播放/暂停图标按钮 -->
            <img
              v-if="currentPlayingId === song.id && isPlaying"
              src="@/assets/play.png"
              alt="暂停"
              class="play-icon"
              @click.stop="toggleSinglePlay(song)"
            />
            <img
              v-else
              src="@/assets/playstop.png"
              alt="播放"
              class="play-icon"
              @click.stop="playSong(song, index)"
            />
          </div>
        </div>
        <!-- プレイリスト全て按钮 -->
        <div class="cus-btn" @click="togglePlayAllList">
          {{ playAllBtnText }}
        </div>
      </div>
    </el-card>

    <!-- 歌词弹窗（仅在播放时有歌词时显示） -->
    <el-dialog
      ref="lyricDialog"
      :visible.sync="lyricDialogVisible"
      title="歌詞"
      top="10vh"
      :close-on-click-modal="false"
      class="lyric-dialog"
      :append-to-body="true"
    >
      <el-scrollbar ref="lyricScroll" style="height: 450px; width: 100%;">
        <div class="lyrics-container">
          <!-- <p 
            v-for="(lyric, i) in currentPlayingSong?.lyrics || []"
            :key="i"
            :class="{ 'active-lyric': currentLyricIndex === i }"
            :ref="`lyric_${i}`"
          >
            {{ lyric.text }}
           
          </p> -->
<p>気になってしまったこれがtrigger</p>
<p>止まることないI need you</p>
<p>苛立った日でも君を見れば脳内happy day</p>
<p>でもね愛、愛、会い足りないから</p>
<p>Bye、Bay なんてしたくはないよ</p>
<p>こんなふうに想えたのは君だけ</p>
<p >一切合切本音で愛をぶつけるから受け取って</p>
<p class="active-lyric">世界中で1人だけ僕は君だけを愛してる</p>
        </div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      // 分类列表
      typeMusicList: [
        { name: "全て", lang: "" },
        { name: "日本語", lang: "jp" },
        { name: "中国語", lang: "ch" },
        { name: "英語", lang: "en" },
        { name: "韓国語", lang: "kr" },
      ],
      activeTypeIndex: 0,
      // 音频路径（public/audio目录）+ 歌词路径
      songList: [
           {
          id: 1,
          name: "ディスコネクトディスコ",
          audioUrl: "./audio/jp1.mp3",
          lang: "jp",
          lyrics: [],
          lrcUrl: "./lrc/jp1.lrc"
        },
        {
          id: 2,
          name: "1022-比尔的歌",
          audioUrl: "./audio/ch1.mp3",
          lang: "ch",
          lyrics: [],
          lrcUrl: "./lrc/ch1.lrc"
        },
        {
          id: 3,
          name: "看月亮爬上来",
          audioUrl: "./audio/ch2.mp3",
          lang: "ch",
          lyrics: [],
          lrcUrl: "./lrc/ch2.lrc"
        },
        {
          id: 4,
          name: "深夜6時",
          audioUrl: "./audio/jp2.mp3",
          lang: "jp",
          lyrics: [],
          lrcUrl: "./lrc/jp2.lrc"
        },
        {
          id: 5,
          name: "ラストハンチ",
          audioUrl: "./audio/jp3.mp3",
          lang: "jp",
          lyrics: [],
          lrcUrl: "./lrc/jp3.lrc"
        },
         {
          id: 6,
          name: "达尔文",
          audioUrl: "./audio/ch3.mp3",
          lang: "ch",
          lyrics: [],
          lrcUrl: "./lrc/ch3.lrc"
        },
          {
          id: 7,
          name: "lovestepを踏みたいの",
          audioUrl: "./audio/jp4.mp3",
          lang: "jp",
          lyrics: [],
          lrcUrl: "./lrc/jp4.lrc"
        },
         {
          id: 8,
          name: "极昼",
          audioUrl: "./audio/ch4.mp3",
          lang: "ch",
          lyrics: [],
          lrcUrl: "./lrc/ch4.lrc"
        },
         {
          id: 9,
          name: "マジか",
          audioUrl: "./audio/jp5.mp3",
          lang: "jp",
          lyrics: [],
          lrcUrl: "./lrc/jp5.lrc"
        },
         {
          id: 10,
          name: "WINDSDAY",
          audioUrl: "./audio/jp6.mp3",
          lang: "jp",
          lyrics: [],
          lrcUrl: "./lrc/jp6.lrc"
        },
         {
          id: 11,
          name: "一切合切",
          audioUrl: "./audio/jp7.mp3",
          lang: "jp",
          lyrics: [],
          lrcUrl: "./lrc/jp7.lrc"
        },
         {
          id: 12,
          name: "红苹果",
          audioUrl: "./audio/ch5.mp3",
          lang: "ch",
          lyrics: [],
          lrcUrl: "./lrc/ch5.lrc"
        },
        // {
        //   id: 3,
        //   name: "日文歌",
        //   audioUrl: "./audio/3.mp3",
        //   lang: "jp",
        //   lyrics: [],
        //   lrcUrl: ""
        // },
        // {
        //   id: 4,
        //   name: "韩文歌",
        //   audioUrl: "./audio/4.mp3",
        //   lang: "kr",
        //   lyrics: [],
        //   lrcUrl: ""
        // },
        // {
        //   id: 5,
        //   name: "日文歌1",
        //   audioUrl: "./audio/1.mp3",
        //   lang: "jp",
        //   lyrics: [],
        //   lrcUrl: ""
        // },
        // {
        //   id: 6,
        //   name: "中文歌2",
        //   audioUrl: "./audio/4.mp3",
        //   lang: "ch",
        //   lyrics: [],
        //   lrcUrl: ""
        // },
        // {
        //   id: 7,
        //   name: "英文2",
        //   audioUrl: "./audio/3.mp3",
        //   lang: "en",
        //   lyrics: [],
        //   lrcUrl: ""
        // },
        // {
        //   id: 8,
        //   name: "韩文歌2",
        //   audioUrl: "./audio/2.mp3",
        //   lang: "kr",
        //   lyrics: [],
        //   lrcUrl: ""
        // },
        // {
        //   id: 9,
        //   name: "韩文歌2",
        //   audioUrl: "./audio/2.mp3",
        //   lang: "kr",
        //   lyrics: [],
        //   lrcUrl: ""
        // },
        // {
        //   id: 10,
        //   name: "韩文歌2",
        //   audioUrl: "./audio/2.mp3",
        //   lang: "kr",
        //   lyrics: [],
        //   lrcUrl: ""
        // },
  
      ],
      currentPlayingId: null, // 当前播放歌曲ID
      currentPlayingSong: null, // 当前播放歌曲对象
      currentPlayIndex: -1, // 当前播放索引
      isPlaying: false, // 播放状态
      currentTime: 0, // 当前播放时间
      duration: 0, // 音频总时长
      playMode: "list", // 播放模式：list=列表，single=单曲
      playAllBtnText: "プレイリスト全て", // 按钮文字
      audio: null, // 纯JS创建的音频对象（不渲染到页面）
      audioErrorHandler: null, // 错误监听缓存
      currentLyricIndex: -1, // 当前高亮歌词索引
      lyricDialogVisible: true // 歌词弹窗显示状态
    };
  },
  mounted() {
    // 初始化：创建纯JS音频对象（无DOM标签）
    this.audio = new Audio();
    // 绑定播放结束事件
    this.audio.addEventListener("ended", this.handlePlayEnd);
    // 绑定播放进度更新事件（核心：监听进度来匹配歌词）
    this.audio.addEventListener("timeupdate", this.handleTimeUpdate);
    console.log("纯JS音频对象初始化完成");
    // 清除旧缓存
    localStorage.removeItem("musicPlayerSongs");
  },
  beforeDestroy() {
    // 销毁前清理所有事件监听，避免内存泄漏
    if (this.audio) {
      this.audio.removeEventListener("ended", this.handlePlayEnd);
      this.audio.removeEventListener("timeupdate", this.handleTimeUpdate);
      this.removeAudioErrorListener();
      this.audio.pause();
      this.audio.src = "";
    }
  },
  computed: {
    // 分类过滤歌曲
    filteredSongs() {
      const targetLang = this.typeMusicList[this.activeTypeIndex].lang;
      return this.songList.filter((song) =>
        targetLang === "" ? true : song.lang === targetLang
      );
    },
  },
  methods: {
    // 解析LRC歌词（过滤注释行，只保留时间戳行）
// 解析LRC歌词（过滤注释行，只保留时间戳行）
parseLrc(lrcText) {
  if (!lrcText) return [];
  // 1. 优化行过滤：trim后非空 + 匹配[MM:SS格式（不再限制00开头）
  const lines = lrcText.split('\n')
    .map(line => line.trim()) // 统一trim，避免换行/空格干扰
    .filter(line => line && /^\[\d{2}:\d{2}/.test(line)); // 匹配[两位数字:两位数字开头
  
  // 2. 移除/g全局修饰符，避免lastIndex累积问题
  const lrcRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]\s*(.+)/;
  const lyrics = [];
  
  lines.forEach(line => {
    // 3. 每次匹配前重置正则lastIndex（双重保险，移除/g后可省略，但保留更健壮）
    lrcRegex.lastIndex = 0;
    const match = lrcRegex.exec(line);
    if (match) {
      const [, min, sec, ms, text] = match;
      // 4. 时间计算优化：统一处理2/3位毫秒
      const msNum = ms.length === 2 ? Number(ms) * 10 : Number(ms);
      const time = Number(min) * 60 + Number(sec) + msNum / 1000;
      // 5. 允许text含空格，仅过滤纯空
      if (text.trim().length > 0) {
        lyrics.push({ time, text: text.trim() });
      }
    }
  });
  console.log("解析后的完整歌词：", lyrics);
  return lyrics;
},
    // 加载歌词文件
    loadLrc(song) {
      if (!song.lrcUrl) return Promise.resolve([]);
      return fetch(song.lrcUrl)
        .then(res => {
          if (!res.ok) throw new Error(`歌词加载失败：${res.status}`);
          return res.text();
        })
        .then(lrcText => this.parseLrc(lrcText))
        .catch(err => {
          console.error(`加载${song.name}歌词失败：`, err);
          return [];
        });
    },
    // 切换分类
    changeType(index) {
      this.activeTypeIndex = index;
      this.stopAllPlay(); // 停止当前播放
      this.playAllBtnText = "プレイリスト全て";
    },
    // 播放/一時停止リスト全て
    togglePlayAllList() {
      const list = this.filteredSongs;
      if (list.length === 0) {
        this.$message.warning("現在のカテゴリーに曲がありません！");
        return;
      }

      if (this.isPlaying && this.playMode === "list") {
        // 暂停列表播放
        this.audio.pause();
        this.isPlaying = false;
        this.playAllBtnText = "プレイリスト全て";
      } else {
        // 播放列表第一首
        this.playMode = "list";
        this.playSong(list[0], 0);
        this.playAllBtnText = "一時停止リスト全て";
      }
    },
    // 播放指定歌曲（核心：纯JS音频对象播放，无DOM标签）
    playSong(song, index) {
      // 停止当前播放
      if (this.audio) {
        this.audio.pause();
        this.removeAudioErrorListener();
      }

      // 设置当前播放状态
      this.currentPlayingId = song.id;
      this.currentPlayingSong = song;
      this.currentPlayIndex = index;
      this.currentLyricIndex = -1; // 重置歌词索引

      // 加载歌词并打开弹窗
      this.loadLrc(song).then(lyrics => {
        this.$set(this.currentPlayingSong, 'lyrics', lyrics);
        // 有歌词才打开弹窗
        this.lyricDialogVisible = lyrics.length > 0;
        console.log(`《${song.name}》歌词加载完成，数量：${lyrics.length}`);
      });

      // 配置纯JS音频对象
      this.audio.src = song.audioUrl;
      this.audio.load();

      // 绑定错误监听
      this.audioErrorHandler = (err) => {
        this.$message.error(`音频播放失败：${song.name}（文件不存在或格式错误）`);
        console.error("音频错误：", err);
        this.isPlaying = false;
      };
      this.audio.addEventListener("error", this.audioErrorHandler);

      // 元数据加载完成后播放
      this.audio.onloadedmetadata = () => {
        this.duration = this.audio.duration;
        // 播放（兼容浏览器自动播放策略）
        const playAudio = () => {
          this.audio.play()
            .then(() => {
              this.isPlaying = true;
              this.playAllBtnText = this.playMode === "list" ? "一時停止リスト全て" : "プレイリスト全て";
              console.log(`《${song.name}》开始播放，时长：${this.formatTime(this.duration)}`);
            })
            .catch((err) => {
              // 自动播放失败时，提示用户手动点击（浏览器安全策略）
              if (err.name === "NotAllowedError") {
                this.isPlaying = false;
                this.$message.info(`《${song.name}》自动播放失败，请点击歌曲旁的播放图标手动播放`);
              } else {
                this.$message.error(`播放失败：${err.message}`);
              }
              console.error("播放错误：", err);
            });
        };
        // 延迟播放，兼容部分浏览器
        setTimeout(playAudio, 50);
      };
    },
    // 单曲播放/暂停（点击歌曲旁的图标）
    toggleSinglePlay(song) {
      if (this.currentPlayingId !== song.id) {
        // 不是当前播放的歌曲，直接播放
        this.playSong(song, this.filteredSongs.findIndex(item => item.id === song.id));
        return;
      }

      // 是当前歌曲，切换播放/暂停
      if (this.isPlaying) {
        this.audio.pause();
        this.isPlaying = false;
        this.playAllBtnText = this.playMode === "list" ? "プレイリスト全て" : "プレイリスト全て";
      } else {
        this.audio.play()
          .then(() => {
            this.isPlaying = true;
            this.playAllBtnText = this.playMode === "list" ? "一時停止リスト全て" : "プレイリスト全て";
          })
          .catch(err => {
            this.$message.error(`恢复播放失败：${err.message}`);
          });
      }
    },
    // 播放进度更新（核心：匹配歌词+滚动）
  // 播放进度更新中，滚动逻辑优化（避免滚动偏移错误）
handleTimeUpdate() {
  if (!this.isPlaying || !this.currentPlayingSong) return;
  
  this.currentTime = this.audio.currentTime;
  const lyrics = this.currentPlayingSong.lyrics || [];
  if (lyrics.length === 0) return;

  let currentIndex = -1;
  const currentTime = this.currentTime;
  // 优化歌词匹配逻辑：从后往前找，避免多匹配
  for (let i = lyrics.length - 1; i >= 0; i--) {
    if (currentTime >= lyrics[i].time - 0.1) { // 缩小偏差值，匹配更精准
      currentIndex = i;
      break;
    }
  }

  if (currentIndex !== -1 && currentIndex !== this.currentLyricIndex) {
    this.currentLyricIndex = currentIndex;
    this.$nextTick(() => {
      const lyricDom = this.$refs[`lyric_${currentIndex}`]?.[0];
      const scrollContainer = this.$refs.lyricScroll?.wrap;
      if (lyricDom && scrollContainer) {
        // 滚动优化：使用scrollTop而非scrollTo，避免smooth导致的卡顿
        const targetTop = lyricDom.offsetTop - (scrollContainer.clientHeight / 2) + (lyricDom.offsetHeight / 2);
        scrollContainer.scrollTop = Math.max(0, targetTop);
      }
    });
  }
},
    // 播放结束处理（列表循环/单曲停止）
    handlePlayEnd() {
      this.isPlaying = false;
      const list = this.filteredSongs;
      
      if (this.playMode === "list" && list.length > 0) {
        // 列表循环：播放下一首
        const nextIndex = (this.currentPlayIndex + 1) % list.length;
        this.playSong(list[nextIndex], nextIndex);
      } else {
        // 单曲模式：停止播放
        this.stopAllPlay();
        this.playAllBtnText = "プレイリスト全て";
      }
    },
    // 停止所有播放
    stopAllPlay() {
      if (this.audio) {
        this.audio.pause();
        this.audio.src = "";
        this.removeAudioErrorListener();
      }
      this.isPlaying = false;
      this.currentPlayingId = null;
      this.currentPlayingSong = null;
      this.currentPlayIndex = -1;
      this.currentLyricIndex = -1;
      this.lyricDialogVisible = false;
      this.currentTime = 0;
      this.duration = 0;
    },
    // 移除音频错误监听
    removeAudioErrorListener() {
      if (this.audio && this.audioErrorHandler) {
        this.audio.removeEventListener("error", this.audioErrorHandler);
        this.audioErrorHandler = null;
      }
    },
    // 格式化时间
    formatTime(time) {
      if (!time || isNaN(time)) return "00:00";
      const min = Math.floor(time / 60).toString().padStart(2, "0");
      const sec = Math.floor(time % 60).toString().padStart(2, "0");
      return `${min}:${sec}`;
    },
  },
};
</script>

<style>
/* 全局重置 */
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  border: 0;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
  height: auto;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
ul,
ol {
  list-style: none;
}
a {
  color: inherit;
  text-decoration: none;
  outline: none;
}
button,
input,
textarea,
select {
  font: inherit;
  color: inherit;
  background: none;
  border: none;
  outline: none;
}
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  background-color: #0c0e14;
}

/* 歌词弹窗样式（强化高亮效果） */
.lyric-dialog {
  z-index: 99999 !important;
  /* 火狐浏览器滚动条全局样式 */
  scrollbar-width: thin;
  scrollbar-color: #1467ff transparent;
}
.lyric
.lyric-dialog .el-dialog__wrapper {
  background-color: rgba(0, 0, 0, 0.7) ;
}
.lyric-dialog .el-dialog {
    max-width: 400px;
    min-width: 300px;
  background-color: #0c0e14;
  border: 2px solid #1467ff;
  border-radius: 8px;
}
.lyric-dialog .el-dialog__header {
  /* background-color: #0c0e14; */
  border-bottom: 1px solid #1467ff;
  padding: 15px 20px;
}
.lyric-dialog .el-dialog__title {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}
.lyric-dialog .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
  font-size: 18px;
}
.lyric-dialog .el-dialog__headerbtn .el-dialog__close:hover {
  color: #1467ff;
}
.lyric-dialog .el-dialog__body {
  padding: 10px !important;
  /* background-color: #0c0e14; */
}

.lyric-dialog .lyrics-container {
  text-align: center;
  /* padding: 5px; */
  /* min-height: 380px; */
  height: auto;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.lyric-dialog .lyrics-container p {

  width: 90%;
  padding: 10px 0;
  font-size: 15px;
  color: #ccc;
  transition: all 0.2s ease;
  line-height: 2;
  margin: 0;
}
/* 强化高亮样式，确保一眼能看到 */
.lyric-dialog .lyrics-container .active-lyric {
  width: 95%;
  color: #1467ff !important;
  font-size: 17px;
  font-weight: 500;
  text-shadow: 0 0 10px rgba(20, 103, 255, 0.8);
  transform: scale(1.05);
}

.lyric-dialog .el-dialog__body .el-scrollbar__wrap {
  background-color: #0c0e14;
  overflow: auto !important;
  /* 隐藏滚动条，但是页面可以滚动 */
    /* 适配Firefox */
  scrollbar-width: none;
  /* 适配IE/旧版Edge */
  -ms-overflow-style: none;
    /* 火狐滚动条兼容 */
  /* scrollbar-width: thin;
  scrollbar-color: #1467ff transparent; */
}
/* 适配Chrome/Safari/新版Edge等WebKit内核浏览器 */
.lyric-dialog .el-scrollbar__wrap::-webkit-scrollbar {
  display: none; /* 彻底隐藏滚动条 */
}
/* 歌词弹窗滚动条（核心优化：调细+位置+圆角） */
/* .lyric-dialog .el-scrollbar__bar.is-vertical {
  display: none;
  width: 4px; 
  right: 2px ;
  opacity: 0.7; 
  transition: opacity 0.2s ease;
} */
/* .lyric-dialog .el-scrollbar__bar.is-vertical:hover {
  display: none;
  opacity: 1;
}
.lyric-dialog .el-scrollbar__thumb {
  display: none;
  background-color: #1467ff ;
  border-radius: 4px;
    height: 4px !important; 
} */
.lyric-dialog{
    scrollbar-width: thin;
      scrollbar-color:#1467ff
      
}



</style>

<style scoped>
/* 空列表提示 */
.empty-tip {
  color: #999;
  font-size: 14px;
  text-align: center;
  padding: 20px 0;
}

.box-card {
  padding-top: 120px;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  border: 0;
  background-image: url("~@/assets/mian-bg-top.png"),
    url("~@/assets/mian-bg-bottom.png");
  background-position: center top, center bottom;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #0c0e14;
  overflow: hidden;
}
.music_content {
  display: flex;
}
.music_name {
  background-image: url("~@/assets/text-boder-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 60px;
  width: 20%;
  height: 40px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  font-size: 13px;
  color: #e2e5f1;
  cursor: pointer;
}
.music_name.active {
  color: rgb(32, 175, 231);
  font-weight: 600;
}

.wrapper {
  position: absolute;
  padding: 0 10px;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(23, 25, 34, 0.2);
}
.logo {
  /* margin-left: 30px; */
      display: flex;
    align-items: center;
  width: 50px;
  height: 50px;
}
.user {
  /* margin-right: 30px; */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  /* 核心：圆形渐变边框 */
  border: 2px solid transparent;
  background:linear-gradient(135deg, #1467ff, #c2baf0, #9610f5) border-box,
            #fff padding-box
}
.user img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 歌曲项样式 */
.song-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
  color: #fff;
  margin-bottom: 10px;
  height: 35px;
  width: auto;
  padding: 0 12px;
  background-image: url("~@/assets/textBox.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-width: 0;
}
.name-img {
  display: flex;
  align-items: center;
}
.song-img {
  width: 15px;
  height: auto;
  margin-left: 8px;
}
.song-name {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 播放中歌曲名变色 */
/* .song-item.active .song-name {
  color: rgb(32, 175, 231);
} */

/* 播放图标 */
.play-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-left: 10px;
}
.song-name {
  cursor: pointer;
  color: #fff;
}
.song-name:hover {
  color: rgb(32, 175, 231);
}

/* 播放列表按钮 */
.cus-btn {
  width: 80%;
  height: 34px;
  margin: auto;
  background: linear-gradient(180deg, #38e5ff, #3e6ade);
  border-radius: 21px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Source Han Sans CN;
  color: #fff;
  cursor: pointer;
  font-size: 13px;
  border: 0;
}
.cus-btn:hover {
  opacity: 0.9;
}

/* 滚动条 */
.music {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-image: url("~@/assets/live_bottom_frame.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 83%;
  background-color: transparent;
}
.music_list {
  padding: 15px 15px;
  width: auto;
  height: 80%;
  border: 0;
  overflow: auto;
  background-color: transparent;
  -webkit-overflow-scrolling: touch;
}
.music_list::-webkit-scrollbar {
  width: 6px;
  background: transparent;
}
.music_list::-webkit-scrollbar-track {
  background: rgba(231, 99, 99, 0.03);
  border-radius: 4px;
}
.music_list::-webkit-scrollbar-thumb {
  background:  rgb(55, 85, 104);
  border-radius: 4px;
    opacity: 0.7;
  transition: opacity 0.2s ease, background 0.2s ease;
}
.music_list::-webkit-scrollbar-thumb:hover {
  background: rgb(55, 85, 104);
  opacity: 1;
}
/* 火狐浏览器兼容 */
.music_list {
  scrollbar-width: thin;
  scrollbar-color: rgb(55, 85, 104) rgba(255, 255, 255, 0.03);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .box-card {
    max-width: 100% !important;
  }
  .el-row {
    margin: 5px 0 !important;
  }
  .el-col {
    margin-top: 5px !important;
  }
  .el-button {
    width: 100% !important;
    margin-bottom: 8px !important;
  }
  .song-item {
    padding: 10px !important;
  }
  /* .lyric-dialog {
    width: 90% !important;
  } */
  .lyric-dialog .lyrics-container p {
    font-size: 14px;
  }
  .lyric-dialog .lyrics-container .active-lyric {
    font-size: 16px;
  }
}
</style>