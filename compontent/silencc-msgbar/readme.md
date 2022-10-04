
## 改用原生的 swiper 实现不要太简单 😕

### 使用说明： 

  使用： 

  ```
    <msgbar>
      <template #item="{ data }">
        <view color="red">
          {{ data.name }}
        </view>
      </template>
    </msgbar>
  ```

  注意：
  
      动画条件是 list.length > count
      list.length < count 的时候不会显示 
      list.length = count 的时候不会滚动

  


          
