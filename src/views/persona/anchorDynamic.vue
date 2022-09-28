<!-- 主播动态 -->
<template>
	<div>
		<div class="anchor-news-wrap">
			<div class="tab">
				<div class="tab-item" v-for="(item,index) in titleTab" :key="index" @click="titleIndex = index"
					:class="titleIndex == index?'cur':''">{{item}}</div>
			</div>
			<div id="" v-if="titleIndex == 0">
				<div style="margin-bottom: 15px;" v-if="type == 0">
					<div class="comment-textarea">
						<div class="c-main">
							<div class="editor dynamic-margin">
								<div class="main">
									<div class="ant-input-textarea ant-input-textarea-show-count"
										:data-count="title.length+' / 1000'">
										<textarea v-model="title" maxlength="1000" placeholder="请输入动态内容～"
											class="ant-input"></textarea>
									</div>
								</div>

								<div class="pic-container" v-if="uploadType == 'img'">
									<div class="header">本地上传</div>
									<div class="body">
										<div class="pic-list" v-for="(item,index) in flie" :key="index">
											<img class="img" :src="item" alt=""><img @click="del(index)" class="sc"
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAMAAAC7m5rvAAAARVBMVEUAAAD7Tk77T0/8UFD/Xl77T0/6Tk77T0/7Tk77T0/7Tk77Tk76UFD8Tk76T0//VVX/Wlr6Tk7////90dH+6Oj9x8f7c3O6KYWzAAAAEXRSTlMA9eZeCezby7evj3xmTjcbEUzq1cEAAADsSURBVEjH1ZZLFoMgDEUb/AKCpFX3v9RO0tYq8nkz7/weOHmQ5HFbWmfGviPq+tG4tswJjSbeQboJ+YMs8QmymSMnxVHUlJDmgS8Z5ivLK06gfNxqiJNQE7U4S8TzlNfIn6qhuAB1rMvARQyHvLiQv/xaVaqpdqdZLsb+rEDlGoV0ZPnwdI2mvwWhGo0+RXFchRPN1GlGtLFOG0Xr67RetI6FbX1dsm4sdKIRC8szwcICgRp4SbAkYABg3ODjAp8y9nHAbwo2BawFgQ0Pa69YMwdHBzaosLGIDWFs5GMLBrTOYMsTtKpBi+FdeQOZEHZV6IPC4QAAAABJRU5ErkJggg=="
												alt="">
											<div class="pic-mask"><img
													src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAMAAADUivDaAAAAflBMVEUAAADS0tKtra20tLSurq6vr6+tra2urq6urq6urq6vr6+5ubmurq60tLSurq6urq6urq6vr6+urq6/v7+urq6wsLCwsLCurq6urq6urq6urq6urq6urq6urq6tra2vr6+tra2tra2urq6ysrKurq6urq6vr6+wsLCurq6tra0D7bIIAAAAKXRSTlMABfcR8j78zrh6LgtKFdrX1JFyCVIyJcGXgWPhoodrOOvKxB3mq1lEsUJmF90AAAHqSURBVFjD7dbZeqowFAXgnYRJBplEQdQ6tt3v/4KnH+SoXQlI21v+Kz8SN8lKAtBsNvsTkUS//29V3Dapw8yyPQX7WNHPqEPgMMjyiiZ720m28g/TxuL6PEw2r6O53HjcdUvjFpJf8tdjKQY8hfNOQ8IlmzzJplqQVWx0PtbxRVDiNkbtjTVVFys4i0e/1RJrlJbNgHsp/Zaa2EFzYNQIscJJ4WJhDWgvM+jQJoRq6LIYb5ahbljH8f8JCcjDc78tBoO9nt6Jv5xDe6/2aa7qiIvRN26lvp/e1Cl02z1KNGxtCz3WZKUTBeF9EA6DVXf9zHdZv/A8tCp7RusuSeN+ipFOtDQG4YluR/KT/mRJBmfqnRlIMkr0gXoMnFKfDkZJl6aRTsmoIS0wpohr6CTWOI8RaSFb967rwd2MRT3QHR7DlDoFPB587CaetmcLjR86paxboFzABn9suAcXsl7q+uJte1gl+jcOohh/GuRkyKHLJ4HASBQU+IJUBEqsoQPQBJ6CZUKGcoOvHJ2pzhUqXMgiwhrsF5X4ul4VPpsVrETNJnlk06eiIe8OT+AtaMTa55dSl8ZtrzzKKQS9EjWSB8k6mfil5Q9MoVA0WZVn5ufaB/2QiveB30pm73q65fqs/UqkBM1ms7/4B5IY2/6/GqC/AAAAAElFTkSuQmCC"
													alt=""></div>
										</div>
										<span class="">

											<el-upload class="avatar-uploader"
												:action="'https://'+QiniuToken.uploadHost" :data="QiniuToken"
												:show-file-list="false" :on-success="handleAvatarSuccess1"
												:before-upload="beforeAvatarUpload">
												<div class="ant-upload ant-upload-select ant-upload-select-text"><span
														tabindex="0" class="ant-upload" role="button"><input type="file"
															accept=".png,.jpg,.jpeg" style="display: none;"><span
															role="img" aria-label="plus"
															class="anticon anticon-plus add-pic"
															style="color: rgb(204, 204, 204);">

															<svg viewBox="64 64 896 896" focusable="false"
																data-icon="plus" width="1em" height="1em"
																fill="currentColor" aria-hidden="true">
																<path
																	d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z">
																</path>
																<path
																	d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z">
																</path>
															</svg>


														</span></span></div>
											</el-upload>
										</span>
									</div>
									<div class="footer">已上传{{flie.length}}张,还能上传{{9 - flie.length}}张</div>
								</div>
								<div class="video-container" v-if="uploadType == 'video'">
									<div class="header">上传视频</div>
									<div style="display: block;">
										<span class="">
											<el-upload class="avatar-uploader"
												:action="'https://'+QiniuToken.uploadHost" :data="QiniuToken"
												:show-file-list="false" :on-success="handleAvatarSuccess2"
												:before-upload="beforeAvatarUpload3">
												<div class="ant-upload ant-upload-select ant-upload-select-text"><span
														tabindex="0" class="ant-upload" role="button"><input type="file"
															accept=".png,.jpg,.jpeg" style="display: none;">
														<div class="add-container" style="height: 80px;"><span
																role="img" aria-label="plus"
																class="anticon anticon-plus add-pic"
																style="color: rgb(204, 204, 204);"><svg
																	viewBox="64 64 896 896" focusable="false"
																	data-icon="plus" width="1em" height="1em"
																	fill="currentColor" aria-hidden="true">

																	<path
																		d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z">
																	</path>
																	<path
																		d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z">
																	</path>
																</svg></span>
														</div>
													</span>
												</div>
											</el-upload>
										</span>
									</div>
									<div class="header">上传封面图</div>
									<div>
										<div class="video" v-if="flieT[0].img"><img class="cover-url"
												:src="flieT[0].img" alt=""><img @click="flieT[0].img = ''" class="sc"
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAMAAAC7m5rvAAAARVBMVEUAAAD7Tk77T0/8UFD/Xl77T0/6Tk77T0/7Tk77T0/7Tk77Tk76UFD8Tk76T0//VVX/Wlr6Tk7////90dH+6Oj9x8f7c3O6KYWzAAAAEXRSTlMA9eZeCezby7evj3xmTjcbEUzq1cEAAADsSURBVEjH1ZZLFoMgDEUb/AKCpFX3v9RO0tYq8nkz7/weOHmQ5HFbWmfGviPq+tG4tswJjSbeQboJ+YMs8QmymSMnxVHUlJDmgS8Z5ivLK06gfNxqiJNQE7U4S8TzlNfIn6qhuAB1rMvARQyHvLiQv/xaVaqpdqdZLsb+rEDlGoV0ZPnwdI2mvwWhGo0+RXFchRPN1GlGtLFOG0Xr67RetI6FbX1dsm4sdKIRC8szwcICgRp4SbAkYABg3ODjAp8y9nHAbwo2BawFgQ0Pa69YMwdHBzaosLGIDWFs5GMLBrTOYMsTtKpBi+FdeQOZEHZV6IPC4QAAAABJRU5ErkJggg=="
												alt=""><img class="video-mask"
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAMAAADUivDaAAAAflBMVEUAAADS0tKtra20tLSurq6vr6+tra2urq6urq6urq6vr6+5ubmurq60tLSurq6urq6urq6vr6+urq6/v7+urq6wsLCwsLCurq6urq6urq6urq6urq6urq6urq6tra2vr6+tra2tra2urq6ysrKurq6urq6vr6+wsLCurq6tra0D7bIIAAAAKXRSTlMABfcR8j78zrh6LgtKFdrX1JFyCVIyJcGXgWPhoodrOOvKxB3mq1lEsUJmF90AAAHqSURBVFjD7dbZeqowFAXgnYRJBplEQdQ6tt3v/4KnH+SoXQlI21v+Kz8SN8lKAtBsNvsTkUS//29V3Dapw8yyPQX7WNHPqEPgMMjyiiZ720m28g/TxuL6PEw2r6O53HjcdUvjFpJf8tdjKQY8hfNOQ8IlmzzJplqQVWx0PtbxRVDiNkbtjTVVFys4i0e/1RJrlJbNgHsp/Zaa2EFzYNQIscJJ4WJhDWgvM+jQJoRq6LIYb5ahbljH8f8JCcjDc78tBoO9nt6Jv5xDe6/2aa7qiIvRN26lvp/e1Cl02z1KNGxtCz3WZKUTBeF9EA6DVXf9zHdZv/A8tCp7RusuSeN+ipFOtDQG4YluR/KT/mRJBmfqnRlIMkr0gXoMnFKfDkZJl6aRTsmoIS0wpohr6CTWOI8RaSFb967rwd2MRT3QHR7DlDoFPB587CaetmcLjR86paxboFzABn9suAcXsl7q+uJte1gl+jcOohh/GuRkyKHLJ4HASBQU+IJUBEqsoQPQBJ6CZUKGcoOvHJ2pzhUqXMgiwhrsF5X4ul4VPpsVrETNJnlk06eiIe8OT+AtaMTa55dSl8ZtrzzKKQS9EjWSB8k6mfil5Q9MoVA0WZVn5ufaB/2QiveB30pm73q65fqs/UqkBM1ms7/4B5IY2/6/GqC/AAAAAElFTkSuQmCC"
												alt="">
											<div class="mask"></div>
										</div>
										<span class="" v-else>
											<el-upload class="avatar-uploader"
												:action="'https://'+QiniuToken.uploadHost" :data="QiniuToken"
												:show-file-list="false" :on-success="handleAvatarSuccess3"
												:before-upload="beforeAvatarUpload">
												<div class="ant-upload ant-upload-select ant-upload-select-text"><span
														tabindex="0" class="ant-upload" role="button"><input type="file"
															accept=".png,.jpg,.jpeg" style="display: none;">
														<div class="add-container" style="height: 80px;"><span
																role="img" aria-label="plus"
																class="anticon anticon-plus add-pic"
																style="color: rgb(204, 204, 204);"><svg
																	viewBox="64 64 896 896" focusable="false"
																	data-icon="plus" width="1em" height="1em"
																	fill="currentColor" aria-hidden="true">

																	<path
																		d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z">
																	</path>
																	<path
																		d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z">
																	</path>
																</svg></span>
														</div>
													</span>
												</div>
											</el-upload>

										</span>
									</div>

									<div class="video-text">只能上传一个视频</div>
								</div>
							</div>
							<div class="bottom">
								<div class="c-tool">
									<div class="c-tool-left showRight">
										<div class="affix">
											<span class="division"></span>
											<div style="position: relative;">
												<div class="common-emoji">
													<el-popover placement="top" width="300" trigger="click">
														<ul class="emoji-mart-category-list">
															<li v-for="(item,index) in emotion" @click="setEmotion(item)">
																<img class="emoji-mart-emoji emoji-mart-emoji-native"
																	:src="`https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif`">
															</li>
														</ul>
														<div slot="reference" class="eomj-icon ant-popover-open"></div>
													</el-popover>
												</div>
											</div>
											<div @click="uploadType = 'img'">
												<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAJKADAAQAAAABAAAAJAAAAAAqDuP8AAADmUlEQVRYCe2YXUiTYRTH3YdjYJEWRB9UeBFhhZvOQMugIggkiISiupEKhbqIopA+qKib6CaoqwokMqG86JMyKqiLzIvyYxprBcUKxYsuJGqmbHPrd17fd7y+vms6t5XgA2fnec5znnP+7znn+WA5OTNtmkXAYsTb3t6+0Gq1FhjlmRhbLJb+kpKSH3rbcUAdHR1bY7HYFSYL9QqZ7AMIl7G3+KgtKyt7L74UQF1dXVUjIyNPMuk8ie1fNputmGh9tYsiYC6pC37DG6Bv6jjTzIOD3dBsMJyD19h9Pt/coaGhFeKZEDZ5PJ5D0s9Wo1RWkjYXvivEpzUSiczRnCPs1fpZ5JrPfPFpzaLjCbn67wApRT0h6JNUoi4snZ2dO1gm9dFaWlr6dCImMhYhwFwFVDN0MhqNtlC8p/4ZINm5AKnTA2BcDynnnl5u7GckQuzccaVA2mw4Twpo3EIjYr/fP294eHgJ8ny+MEAtJD00XS7Xd1J0D/1qnb3rgIrqxqZdU0A9PT0FfGUdBmsGBweL9Cu5fH1cvhcBdksvN/ZZuwvZQUAUQ2+4Fm4YdczGpoBCodBrlFeZLRA5RdpIBDYAqjbRV3NZhtG9nMBGQrEpILQXqCs+whtx+gkegq/lyw9Akr59gOpHflrVTQszBZSbm7smHA4v5l5rM0TgMSAkVc8gqasTvBQekY53aUGDEdNdRlEGCHmrAYziE5B+ngr7VQA20nczEAg40wXINELJjBORFxR3C3pVpK5oYGDgAv0j+nXIrURvC7L19AvhffCH8qF6PWM/JUBixG631/OG2YwTB3SYVC5D3ExUf8LLGe+FS1r17Rgf8gqBvBC/6Ce0vmnKtMm/cbfb7WM+/nYC1HbojlwT0BnmNDARQH5mLLtO2kbGXgCXjw7H/qYMSMxQT9cwXg2NOyyR+TmvjjscjvnoLUc9n/F55CGAz4L2jIUyOko5ZZoxnN3H+AOv11sBX4pcIuHnjPqg6QgnRfI8PkvK5BjZ5HQ67+rntf6UAYkhHMRgbSqJKGFTa8e0fmTRlFKW0OsUJqzslPiFR8jTErFJ4lF84lvBYeVM6SXkQTGCcBsPq0WTNJiyend392oWV6oG/MLtgImyBW/Tr4XcgOpjrG1R0clY43pyaMbZgU3SV8KVl5d3NBgMyjOjEkAWeFxRlDLdCMp1dmWD+BHnSgOIHPU74esQZOXPBskGYJ5zdLxUYcyw6ReBP0Mzcj2WiOuJAAAAAElFTkSuQmCC" alt=""></div>
											<div @click="uploadType = 'video'">
												<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAJKADAAQAAAABAAAAJAAAAAAqDuP8AAACz0lEQVRYCe2XzWsTQRiHk7VuIopBD4qSSwo5bYluEqTgTYug/4BHv9CjnipIsVCxFj/Ag6CgJ68exJvgRVEpWEmMkZwCxkNQFJKQUEhcTeIzYacsS0t2N7slQheGeefd6fye/uYjs6HQ1vOfORCWvPl8/ny/379M0chNyHzAdZvxc4qizKXT6bdCawCUy+VmAbkTsPiGw4fD4R5Qx3VdfxOuVCrRWq3WoHfU/Iuv1IJ8M569iBwwhT5ks9npiUajMUViAAPps0wmc3ozSIQGs6IwO2XCSbR12tsUgl0WgO+WOPBQTBXlpxACRq1Wq6oSuKpLgbEDcr29xSao1+sLWHyYf/4Fa+4xtnddGrFhd9cOAXMdmKuMeILykEW5XCgUxNnly+MaCJgZm/KRbrebB2yOd64dt40Vcg3EADvMQZrUP0QMiEq5CdQKJ/4h872nygvQQIh180tVVTFVTy3Keq/X+wjUQqlUUi15x6FnIKGQSqUanK5nOfZP0ayaqtuBmm+32znAsmbOcTUSkFThh/FlLBbTcO2JzFFPAfaOaZy25IaGvgAJlWQy2eIIuIRbM4B9M5XFT9IVM3ZU+QZkUVu70lhyjsORt6lUKpfLu1ut1j2m6aLM4dRvHHsg205qXxxi8Z5sNpsltv4aDOJfKEe54yw7AZF9RnKoWCzuMQzjPq6ckQNS/8GVpUgksqhpmmHJOwo9A+HGPmBKqMgLlhD8BMw5dt1nR+rrdHINxLpYBUYMFTNLiJxw4gYgt4n/ipdeHy9r6JVNbAUInS2/OCqMGNe1Q9Fo9Fan09mJSxkAnuPKI2rfrh+ugcyFOmtzybemlynzTXy9gcYPiLWwaiE9aIkDD9FWKPuFEOvQiMfjxvh9KCYSiQ5XhHlI5af0ZODW2ARwp4f+NZEerCHOkLucsBd4USQ30sFm0xrWFJ/s79E9xkXv9bDOW+/H0oF/K3D/bt3yc58AAAAASUVORK5CYII=" alt=""></div>
										</div>
									</div>
									<div class="c-tool-right sub-btn" @click="submit()">发布</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					style="border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; overflow: hidden; background: rgb(255, 255, 255);">
					<div class="tab-content">
						<div class="tab-content-item padding21px">
							<div class="anchor_news_wrap">
								<div>
									<el-empty v-if="dynamicList.length == 0" :image-size="300" :image="require('../../assets/images/qsy.png')"></el-empty>
									<div class="anchor_news_item" v-for="(item,index) in dynamicList" :key="index">
										<div class="anchor_news__inner_wraps">
											<div class="anchor_news_title_wraps"><a target="_blank"
													href="/personal-space?headerNavIndex=2&amp;id=3276663">
													<div class="lazyload-wrapper "><img
															:src="item.avatar || require('../../assets/images/team.png')">
													</div>
												</a>
												<div class="other_info"><a class="title" target="_blank"
														href="/personal-space?headerNavIndex=2&amp;id=3276663">{{item.user_nickname}}</a>
													<div class="time_info">{{item.addtime}}</div>
												</div>
											</div>
											<div class="anchor_news_content_wraps">
												<router-link tag="a" target="_blank" :to="'/comment?id='+item.id">
													<p v-html="getText(item.title)"></p>
												</router-link>
												<div class="anchor-news-imglist">
													<!-- img-box-one-wrapper 单张 《img-box-wrapper 多张》 -->
													<!-- 图片  -->
													<div class="anchor-news-imglist" v-if="item.is_flie_type == 0">
														<div class="img-box-wrapper"
															:class="item.flie.length == 1?'img-box-one-wrapper':''"
															v-for="(item1,index1) in item.flie"><img preview="1"
																:src="item1">
														</div>
													</div>

													<!-- 视频 -->
													<div class="img-box-one-wrapper" style="position: relative;" v-else>
														<img :src="item.flie[0].img">
														<div class="mask"><img
																src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAB4CAMAAAAQc/ZTAAAApVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+4/eNVAAAANnRSTlMA8/j8CQNFw7egjD0mEu7kmTYyGermvqZp3s6tSyIdDoN2bmZXKwbb0cmqYVIWDNiye1sukofJUFtWAAADkUlEQVRo3tXah1LiUACF4ZObRgihhN6RoiBV0PP+j7bjumNGVLgtmdnvBf6B5OaWBP+LZrydvUbPpXATlobR61svGPvI1WQbrQW/E8fhfIVcTJf1Pm9pdxdN2OWPuoL3uaWzB2tW5TZlOVEMK9Ih1YQBjMUlqhvsYKRSop51DG3eTFBbtIeeUZ8mqj0f6g5dmgonUHU50lxrBDULQSvKPuQ9dmlLuIesaYf2PI0hZz+gTe0LZIz7tMuJcV+lTdtEgHuafdrnpLhtumYeWhXc4nWYj34TNzwzL2sPv5ozPxF+kwrm6IyfTfvMk1MxuLDWL++SeXvDd4ca8yYq+KbM/HVw7eKyAEtcCVmE9gFfjFiMF4Mfa6DlAZmYRZkDmRKLUnvEpwaLs8CniMUZZJO7wwKt8M+ZRSqr31Cth8auLmik5uOvpitdXQFAs+7SRKC6lNnhQ+WZBur4a0hZ2ZhLO9TWxzu/SkkOkAkG1DUGgJRK2czyiXq2APCgm4W/qFFHV234OLjmPVSprgYAbYMskJQFle2BKQ2ymsM4BhqmWaAyVJ+FzuZZoNFRfSzPDLK6w/gEPBtkdYfxEejYysLvtSmnCmyMsxnvpUoZAjhayGaSruScUrOSzZwoIUHVcrYhNwe5lrOPcss4x3K2SQkVtC1nHyihiSe72UBQwgEDm9lJRBkuEGpmTeZeBzgZZ7NHlMLy4tU0mz2QpYVATzNrsoqsA4Fm1mTN/ABMjLONDhWNADiaWYP9UAXAwCCrt/sTPoCyfjZ5E9pngCPlbLYlMDgTm7rSWaMNUCYGoLCaEsjsjtTl+Hj3pnIHfgg21FdSPQw7+XiXlmiihw9PlNVNgFWXRkSCDy+UJgZtGhrinzGLtCvwNDlTzY57tizOKz491lgUd2L6TtH8DaPXYjHcytWiuhhdfDGtsgjuBV8tWIQ6rm2Yv1aCa6nL3G3x3SvzFuIH0xrzJVb4SewyVwuDHbGtIVvUq76nA36T1JgXccHvUof5cJcaRw/merht5zIHM9zTo3113De3X/Uh4SyK/IczgUOL5pDVaNEWsYS8SUg7+g2o8Mu0YZhA0cj8jxZzqJucaGaTGnwFbvINePHfvEd7GBhHLjWUGjA0Uf/OYpjCgma5RXkiWsGSx91QUEpne4BNSa9zr+xuXiawzwtm4a/pdXk0RW4OjfPseS2YEcdTeRsnKIK3H1/iIE7Hew//kz/wxRSXLXEZwAAAAABJRU5ErkJggg==">
														</div>
													</div>
												</div>
												<div class="oter_info_wrap ">
													<router-link tag="a" target="_blank" :to="'/comment?id='+item.id">
														<div class="item pl_item">
															<span class="pl_bg icon_bg"></span>
															<span class="num">{{item.comment}}</span>
														</div>
													</router-link>
													<div class="item dz_item" :class="item.is_likes == 1?'is_likes':''"
														@click="commentLikes(item)"><span
															class="dz_bg icon_bg "></span><span
															class="num">{{item.like}}</span></div>
													<div class="item fx_item"><span class="fx_bg icon_bg"></span><span
															class="num">分享</span></div>
													<div class="item delete_item"><span
															class="delete_bg icon_bg"></span><span class="num">删除</span>
													</div>
												</div>
											</div>
											
											<!-- <div class="comment_wrap comment_wrap_0">
												<div class="anchor_news_comment_wraps">
													<div class="anchor_news_comment_input_wraps">
														<div class="anchor_news_comment_input_left "><input type="text"
																class="input_" placeholder="说点什么吧" value="">
															<div class="emoj-wrap">
																<div class="common-emoji">
																	<div class="eomj-icon"></div>
																</div>
															</div>
														</div><button class="submit_btn disabled"
															disabled="">发送</button>
													</div>
												</div>
											</div> -->
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- <div class="not-fulfill-one-page-wrap">
					<hr class="line"><span class="content">无更多数据</span>
					<hr class="line">
				</div> -->
				
			</div>

			<div v-if="titleIndex == 3">
				<div
					style="border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; overflow: hidden; background: rgb(255, 255, 255);">
					<div class="tab-content">
						<div class="tab-content-item padding21px">
							<div class="live_play_back_wraps">
								<div>
									<el-empty :image-size="300" :image="require('../../assets/images/qsy.png')">
									</el-empty>
									<!-- <div class="live_play_back_list">
										<div class="time_title">2021-11-09</div>
										<div class="pay_back_list_wrap">
											<div><a class="live_play_back_itme_wraps" target="_blank"
													href="/anchor/live?anchorId=103090&amp;recordId=1309930&amp;playBack=true">
													<div class="img-wrap"><img class="angle-icon"
															src="/_next/static/images/img_jiaobiao2-e72a914e5a14c64e7e9034a63543d094.png"
															alt="">
														<div class="title-line">
															<div class="con ellipsis">印尼</div>
														</div>
														<div class="play-total-time">00:18:39</div>
														<div class="lazyload-wrapper "><img
																src="http://live-prod.ssjnrt.com//snapshot/push.6qz15s.com/live/1309930/20211110034625.jpg?x-image-process=image/format,webp">
														</div>
														<div class="mask"><img
																src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAB4CAMAAAAQc/ZTAAAApVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+4/eNVAAAANnRSTlMA8/j8CQNFw7egjD0mEu7kmTYyGermvqZp3s6tSyIdDoN2bmZXKwbb0cmqYVIWDNiye1sukofJUFtWAAADkUlEQVRo3tXah1LiUACF4ZObRgihhN6RoiBV0PP+j7bjumNGVLgtmdnvBf6B5OaWBP+LZrydvUbPpXATlobR61svGPvI1WQbrQW/E8fhfIVcTJf1Pm9pdxdN2OWPuoL3uaWzB2tW5TZlOVEMK9Ih1YQBjMUlqhvsYKRSop51DG3eTFBbtIeeUZ8mqj0f6g5dmgonUHU50lxrBDULQSvKPuQ9dmlLuIesaYf2PI0hZz+gTe0LZIz7tMuJcV+lTdtEgHuafdrnpLhtumYeWhXc4nWYj34TNzwzL2sPv5ozPxF+kwrm6IyfTfvMk1MxuLDWL++SeXvDd4ca8yYq+KbM/HVw7eKyAEtcCVmE9gFfjFiMF4Mfa6DlAZmYRZkDmRKLUnvEpwaLs8CniMUZZJO7wwKt8M+ZRSqr31Cth8auLmik5uOvpitdXQFAs+7SRKC6lNnhQ+WZBur4a0hZ2ZhLO9TWxzu/SkkOkAkG1DUGgJRK2czyiXq2APCgm4W/qFFHV234OLjmPVSprgYAbYMskJQFle2BKQ2ymsM4BhqmWaAyVJ+FzuZZoNFRfSzPDLK6w/gEPBtkdYfxEejYysLvtSmnCmyMsxnvpUoZAjhayGaSruScUrOSzZwoIUHVcrYhNwe5lrOPcss4x3K2SQkVtC1nHyihiSe72UBQwgEDm9lJRBkuEGpmTeZeBzgZZ7NHlMLy4tU0mz2QpYVATzNrsoqsA4Fm1mTN/ABMjLONDhWNADiaWYP9UAXAwCCrt/sTPoCyfjZ5E9pngCPlbLYlMDgTm7rSWaMNUCYGoLCaEsjsjtTl+Hj3pnIHfgg21FdSPQw7+XiXlmiihw9PlNVNgFWXRkSCDy+UJgZtGhrinzGLtCvwNDlTzY57tizOKz491lgUd2L6TtH8DaPXYjHcytWiuhhdfDGtsgjuBV8tWIQ6rm2Yv1aCa6nL3G3x3SvzFuIH0xrzJVb4SewyVwuDHbGtIVvUq76nA36T1JgXccHvUof5cJcaRw/merht5zIHM9zTo3113De3X/Uh4SyK/IczgUOL5pDVaNEWsYS8SUg7+g2o8Mu0YZhA0cj8jxZzqJucaGaTGnwFbvINePHfvEd7GBhHLjWUGjA0Uf/OYpjCgma5RXkiWsGSx91QUEpne4BNSa9zr+xuXiawzwtm4a/pdXk0RW4OjfPseS2YEcdTeRsnKIK3H1/iIE7Hew//kz/wxRSXLXEZwAAAAABJRU5ErkJggg==">
														</div>
													</div>
													<div class="other_info"><span class="time">2021-11-09
															15:29:27</span><img
															src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAA+NJREFUWAntmE1IlEEcxl3XPrQOW+FBjx4q3INFHmxDwo+kKAjCKPqyKLtIiiF06dgtslS8JGkFgVQEFVKYH5CweYnaw0YlBF70sPRxKA3D3X7/7Z1ldpxd10VC4R14/c8887zPPO9/5p131pwct7gZcDPgZsDNgJuBJWTAswRuSmowGMyfmZmpiMViOzweTyFEuaREwCJg7wsKCsYDgcDsPzj7v1kbDofDa6empuox08jwezC2ZhEbc3CD8HqKi4sf+/3+uUX41u4lG2ZA7/DwcBPxKooqk1bxNKBk/VpNTU03cT4Nb0HXkgyPjIzsikajdzBbtkApCwCzodzc3PPV1dVvM709Y8NDQ0PHEe3D7HqbOIPTFftI/Ez/V4ezBWwr2HaidSz6fsM9V1tb22/TNTGriEliCbSR2esmLm0GfMPVk5+f/5SX6puNw0u5eXZ29jCmG7l22zhotGH6hq1PxxY1TGZPccN9M0MM8ImrlXX4QhdcrM7DH0DrJtc2nYtWjPZpTD/QcbOe1vDo6GjF/Pz8a8STdgDEX3m93iNVVVU/TUFpj42NbZJYWVn5XaJZ0N2I7hN09xl9c3l5eXvRHTfwRDOlYdm2pqen3yFammBTwWx/UVFRg7ktwfOQvUtQWqiXyD1wvxA6mIUuJ4MCx4ujLzN3TGES4X1Af6eprzi5qmJGzF6xmO1l8JOmmJhl6TwndnDFzYqe1AXjQZ4Rk5IjGmidwGCvPja8Uhlbx/S61bBMGaTLOhHhMMugiRjVcak7mT1o4qqNiUMOR0HxKFqOZjipg7FDodAGA4s3rYZZXw0M4tNvQPwia0u2IFtpsYEGZuWIpmjrXBk7Eomc1TFVtxrmhqOK4MRBpi9oYPGmvGDwE8vAxhFMOOplNDmO9qCOWzzEu62GeeKk9aYLmXWmNGOueW82bathhB4aYnWswYCBxZvyseD5ZDdIW4STaptztOt0AfiP9LaqWw0XFhbe5YYfiiSRKbrNy2j9LNPdqXNT1DtsuGiKtt4nY4sHHVN1q+GysrJfENoVSSKifl7GbuKCJcAaFMMDOt+oD8DpMjDR9DiafqOv3fFgwOzTCxAHSPfh8Pl8Z8rLy//o98rgTG0zWDP1EumTZUDolAeiLp/eRHH078GVQ1WiwEv74UhpWBSYrqw+zXLYkftTHYZkn1/2T7MMKCXV4YcuOUq2clh5GSdm+Ae9/VBvkdnlP/woD0z16jleKtNkRtZaH5mx7hSyRikr4wCvTK+qn0jKNFlcPT9ClWmJExMT6yYnJ+upXuBauT/zxaxZ/uc/Usyx3babATcDbgbcDLgZSJuBvy98Gohc5JbZAAAAAElFTkSuQmCC"
															alt="" class="num_icon"><span class="num">2</span></div>
												</a></div>
										</div>
									</div> -->
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="not-fulfill-one-page-wrap" v-if="titleIndex != 1">
					<hr class="line"><span class="content">无更多数据</span>
					<hr class="line">
				</div>
			</div>

			
		</div>

	</div>
</template>

<script>
	import emotion from './emotion.json'
	import {
		setDynamiclikes,
		anchorDynamicsCommentLikes,
		anchorDynamicsUser,
		anchorDynamicsList,
		userPostList,
		watchlistList
	} from '../../api/user.js'
	export default {
		props: ['type', 'infos'],
		data() {
			return {
				emotionIs: false,
				uploadType: '',
				titleIndex: 0,
				// QiniuToken: {},
				flie: [],
				flieT: [{
					img: '',
					video: ''
				}],
				page: 1,
				page1:1,
				info: {},
				title: '',
				zhuList:{},
				dynamicList: [],
				emotion: emotion,
				// titleTab: ['主播动态', '直播回放']
				titleTab: ['主播动态']
			}
		},
		computed: {
			QiniuToken() {
				return this.$store.state.user.QiniuToken
			}
		},
		watch: {
			
			uploadType(e) {
				let title = ''
				if (e == 'img' && (this.flieT[0].img || this.flieT[0].video)) {
					title = '确定放弃上传图片吗？'
				} else if (e == 'video' && this.flie.length != 0) {
					title = '确定放弃上传视频吗？'
				} else {
					return
				}
				let _this = this
				this.$confirm(title, '确认信息', {
						distinguishCancelAndClose: true,
						confirmButtonText: '取消',
						cancelButtonText: '确定'
					})
					.then(() => {
						// console.log(1)
						_this.uploadType = e == 'img' ? 'video' : 'img'
					})
					.catch(action => {
						// console.log(2)
						_this.uploadType = e

					});
			}
		},

		mounted() {
			// 获取七牛token
			// this.QiniuToken()

			if (JSON.stringify(this.$route.query) !== '{}') {
				this.info = this.infos
			} else {
				this.info = this.$store.state.infos
			}
			// console.log();
			// 获取主播动态列表
			this.userPostList(this.info)
		},
		methods: {
			// 用户关注列表
			watchlistList(type){
				let data = {
					page1:this.id,
					uid:this.info.id,
					type:type
				}
				watchlistList(data).then(res=>{
					this.zhuList = res.data
				}).catch(res=>{
					
				})
			},
			
			// 切换
			setIndex(type){
				this.titleIndex = type
			},
			
			async getQiniu() {
				let QiniuToken = this.$store.state.user.QiniuToken
				if (JSON.stringify(QiniuToken) === '{}') {
					const {
						code,
						data
					} = await this.$store.dispatch('user/SET_QINIU_TOKEN')
					if (code === 0) {
						this.QiniuToken = data
					}
				} else {
					this.QiniuToken = QiniuToken;
				}
			},
			// 点赞
			commentLikes(item) {
				// console.log(item);
				setDynamiclikes({
					id: item.id
				}).then(res => {
					if (item.is_likes == 1) {
						item.like++
						item.is_likes = 0
					} else {
						item.like--
						item.is_likes = 1
					}
				}).catch(res => {})
			},
			// 
			setEmotion(item) {
				this.title = this.title + item
			},
			// 获取主播动态列表
			userPostList(info) {
				// console.log(info);
				let data = {
					uid: info.id,
					page: this.page
				}
				userPostList(data).then(res => {
					this.dynamicList = res.data.data
				}).catch(res => {})

			},
			anchorDynamicsList() {
				let data = {
					page: 1
				}
				anchorDynamicsList(data).then(res => {

				}).catch(res => {})
			},

			// 删除已上传的图片
			del(index) {
				this.flie.splice(index, 1)
				// console.log(this.flie);

			},
			// 提交数据
			submit() {
				let data = {
					title: this.title,

				}
				if (!data.title) {
					return this.$message.warning('请输入动态内容')
				}
				if (this.uploadType == 'img') {
					data.flie = this.flie
				} else if (this.uploadType == 'video') {
					data.flie = this.flieT
				}
				anchorDynamicsUser(data).then(res => {
					this.$message.success('审核中')
					this.flie = []
					this.title = ''
					this.uploadType = ''
					this.flieT[0].img = ''
					this.flieT[0].video = ''
					this.userPostList()
				}).catch(res => {

				})
			},
			// 
			getText(str) {
				// let str = 'jfkdsj[咒骂]dsjfkljsa[憨笑]哈哈哈，[惊恐]'
				let exp = /\[(.*?)\]/g; //匹配[*] 大括号里面任意内容的正则
				let arr = str.match(exp); //字符串匹配出来的数组
				// console.log(arr);
				if (!arr) return str;
			
				this.emotion.forEach((item1, index) => {
					arr.map(item => {
						if (item1 === item) {
							str = str.replace(item,
								`<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif'>`
							);
						}
					}); //循环遍历
				})
				return str;
			},


			// 定义上传图片名称
			beforeAvatarUpload(file) {
				let QiniuToken = this.$store.state.user.QiniuToken
				const fileName =
					new Date().valueOf().toString() +
					this.$common.rand() +
					file.name.slice(file.name.lastIndexOf("."));
				QiniuToken.data = file;
				QiniuToken.key = `${fileName}`;
			},
			handleAvatarSuccess1(res) {
				this.$message.success('图片上传成功')
				this.flie.push(`${this.QiniuToken.domain}/${res.key}`)
			},
			handleAvatarSuccess2(res) { //视频上传成功
				this.$message.success('视频上传成功')
				// this.flie.push({
				// 	video: `${this.QiniuToken.domain}/${res.key}`
				// })
				this.flieT[0].video = `${this.QiniuToken.domain}/${res.key}`
			},
			handleAvatarSuccess3(res) { //图片上传成功
				this.$message.success('图片上传成功')
				this.flieT[0].img = `${this.QiniuToken.domain}/${res.key}`
			},
			beforeAvatarUpload3(file) {
				// console.log(file);
				let QiniuToken = this.$store.state.user.QiniuToken
				const isLt10M = file.size / 1024 / 1024 < 500;
				if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) == -
					1) {
					this.$message.error('请上传正确的视频格式');
					return false;
				}
				if (!isLt10M) {
					this.$message.error('上传视频大小不能超过500MB哦!');
					return false;
				}
				const fileName =
					new Date().valueOf().toString() +
					this.$common.rand() +
					file.name.slice(file.name.lastIndexOf("."));
				QiniuToken.data = file;
				QiniuToken.key = `${fileName}`;
			}
		}
	}
</script>

<style>
	.common-emoji-ul {
		width: 280px;
		height: 240px;
		padding: 12px;
		position: absolute;
		left: 583.5px;
		top: 197px;
		z-index: 99;
		left: 559px;
		transform-origin: 0px 324px;
		overflow-y: scroll;
		background-color: white;
	}

	.common-emoji-ul img {
		font-size: 24px;
		margin: 6px;
		display: inline-block;
		width: 24px;
		height: 24px;
	}

	.mask {
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		display: flex;
		border-radius: 5px;
		justify-content: center;
		align-items: center;
	}

	.mask img {
		margin: auto;
		opacity: 0;
		z-index: 9;
		height: 30px !important;
		width: 30px !important;
		;
		transform: scale(1.6);
	}


	.anchor-news-imglist:hover .mask {
		-webkit-animation: pulse .5s ease;
		-moz-animation: pulse .5s ease;
		background: hsla(0, 0%, 40%, .5)
	}

	.anchor-news-imglist:hover .mask img {
		display: inline-block;
		-webkit-animation: playBtn .5s ease;
		-moz-animation: playBtn .5s ease;
		transform: scale(1);
		opacity: 1
	}
</style>
