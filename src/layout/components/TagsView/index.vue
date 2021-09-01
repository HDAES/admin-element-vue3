<template>
  <div class="tags-views-container" ref="tags">
    <template v-for="(item,index) in visitedViews" :key="index"> 
      <router-link 
        :to="item.path" 
        :class="item.active?'tags-select tags':'tags'"
        @contextmenu.prevent="openMenu(item,$event)"
        >{{item.meta.title}}
         <i class="el-icon-close" style="font-size: 8px"  @click.prevent.stop="closeSelectedTag(item)" />
        </router-link>
    </template>

    <div class="contextmenu" :style="{left:styleLeft+'px'}" v-show="show">
        <div class="item" @click="handleReload">
          <i class="cicon el-icon-refresh-left"/>
          <span class="text">重新加载</span>
        </div>
        <div class="disable">
          <i class="cicon el-icon-close"/>
          <span class="text">关闭标签</span>
        </div>
        <div class="line"></div>
        <div class="item" @click="closeLeft">
          <VerticalRightOutlined class="cicon"/>
          <span class="text">关闭左侧标签页</span>
        </div>
        <div class="item" @click="closeRight">
          <VerticalLeftOutlined class="cicon"/>
          <span class="text">关闭右侧标签页</span>
        </div>
        <div class="line"></div>
        <div class="item" @click="closeOthers">
          <PicCenterOutlined class="cicon"/>
          <span class="text">关闭其他标签页</span>
        </div>
        <div class="item">
          <MinusOutlined class="cicon"/>
          <span class="text">关闭全部标签页</span>
        </div>
      </div>
  </div>
</template>

<script>
import { useAppSetting } from '@/hooks/setting/useAppSetting'
import { VerticalRightOutlined, VerticalLeftOutlined, PicCenterOutlined, MinusOutlined } from '@ant-design/icons-vue'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
export default {
  components: { VerticalRightOutlined, VerticalLeftOutlined, PicCenterOutlined, MinusOutlined },
  setup(){
    const router = useRouter()
    const { visitedViews, delView,closeLeftViews,closeRightViews,closeOthersViews } = useAppSetting()
    const show = ref(false)
    const tags = ref(null)
    const selectedTag = ref(null)
    const styleLeft = ref(0)

    watchEffect(() =>{
      if(show.value){
        document.body.addEventListener('click', closeMenu)
      }else{
        document.body.removeEventListener('click', closeMenu)
      }
    })

    //重新加载
    const handleReload = () =>{
      router.replace({
        path: '/redirect' + selectedTag.value.fullPath
      })
    }

    //关闭选中标签
    const closeSelectedTag = (tag) => delView(tag)
    //关闭左侧标签
    const closeLeft = () => closeLeftViews(selectedTag.value)
    const closeRight = () => closeRightViews(selectedTag.value)
    const closeOthers = () => {
      closeOthersViews(selectedTag.value)
    }
    const openMenu = (tag, e) =>{
      const menuMinWidth = 105
      const offsetLeft = tags.value.getBoundingClientRect().left
      const offsetWidth  = tags.value.offsetWidth
      const maxLeft = offsetWidth - menuMinWidth 
      const left = e.clientX - offsetLeft + 10 
      if (left > maxLeft) {
        styleLeft.value = maxLeft
      } else {
        styleLeft.value = left
      }
      show.value = true
      selectedTag.value = tag
    }

    const closeMenu = () =>{
      show.value = false
    }
    return {
      show,
      openMenu,
      tags,
      styleLeft,
      handleReload,
      visitedViews,
      closeLeft,
      closeRight,
      closeOthers,
      closeSelectedTag
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-views-container{
    position: relative;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);
    .tags{
      display: inline-block;
      height: 25px;
      line-height: 25px;
      padding: 0px 10px;
      text-decoration: none;
      color: #333;
      border: 1px solid #d8dce5;
      margin-right: 5px;
      font-size: 14px;
      border-radius: 2px;
    }
    .tags-select{
      background-color: #0960BD;
      color: #fff;
    }
    .tags-select::before{
      position: relative;
      left: 0;
      content: '';
      width: 8px;
      height: 8px;
      display: inline-block;
      border-radius: 50%;
      margin-right: 4px;
      background: #fff;
    }
    .tags:active{
      color: #333;
    }
    .tags-select:active{
      color: #fff;
    }
    .contextmenu{
      position: absolute;
      top:20px;
      display: flex;
      flex-direction: column;
      z-index: 999;
      background-color: #fff;
     
      border-radius: 2px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);
      .line{
        height: 1px;
        background-color: #eee;
      }
      .item{
        padding:0px 30px 0 10px;
        cursor: pointer;
        .text{
          font-size: 14px;
          padding-left: 10px;
          color: #666;
        }
        .cicon{
          color: #666;
        }
      }
      .item:hover{
        background-color: #eee;
      }
      .disable{
        padding:0px 30px 0 10px;
        .text{
          font-size: 14px;
          padding-left: 10px;
          color: #aaa;
        }
        .cicon{
          color: #aaa;
        }
      }
    }
}
</style>