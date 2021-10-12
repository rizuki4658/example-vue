<template>
  <div v-if="active">
    <div v-if="loadingUnprint" class="wrapper-loading">
      <div class="font-xxl" style="font-size: 64px; height: 80px; width: 100px; position: relative; overflow: hidden;">
        <svg-icon icon-class="cloud" class="one"/>
        <svg-icon icon-class="water" class="two"/>
        <svg-icon icon-class="water" class="three"/>
        <svg-icon icon-class="water" class="four"/>
      </div>
    </div>
    <el-card
      :style="{ backgroundImage: 'url(' + getUrlImage('about-header-gray.jpg', 'pp') + ')' }"
      shadow="never"
      class="header">
      <div v-if="windowWidth > 768" class="content-about-header">
        <div class="greeting-word text-caveat">{{ $t('label.greetingMe') }}</div>
        <div class="name-word text-alfa">
          Rizki Khair
        </div>
        <div class="position-word">FRONTEND &nbsp; ENGINEER</div>

        <div class="mt-16">
          <el-button @click="back">
            <svg-icon icon-class="password"/>
            Login
          </el-button>
          <el-button type="success" @click="download">
            <svg-icon icon-class="download"/>
            Download
          </el-button>
        </div>
      </div>

      <el-row type="flex" justify="center" align="middle" v-if="windowWidth <= 768">
        <el-col :xs="18">
          <div class="text-caveat font-lg">{{ $t('label.greetingMe') }}</div>
          <div class="text-alfa font-lg">Rizki Khair</div>
          <div class="font-sm">FRONTEND &nbsp; ENGINEER</div>
          <div class="mt-16">
            <el-row type="flex">
              <el-col class="mb-16" style="width: 120px; margin-right: 10px;">
                <el-button @click="back">
                  <svg-icon icon-class="password"/>
                  Login
                </el-button>
              </el-col>
              <el-col>
                <el-button type="success">
                  <svg-icon icon-class="download"/>
                  Download
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>

        <el-col :xs="6" class="text-right">
          <el-avatar :size="sizeImage" src="https://empty">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="never" class="refresh">
      <div class="mb-24">
        <el-button class="font-lg" style="padding: 0px; background-color: transparent !important; border: 0px;">
          <span class="text-alfa font-xxl">{{ $t('menu.about_me') }}</span>
        </el-button>
      </div>
      <div class="mb-32 text-open font-sm">
        <el-row>
          <el-col :md="12" :style="windowWidth <= 768 ? 'font-size: 12px;' : ''" class="text-left-just">{{ $t('desc.about_me_one') }}</el-col>
        </el-row>
        <div class="mb-16"/>
        <el-row>
          <el-col :md="12" :style="windowWidth <= 768 ? 'font-size: 12px;' : ''" class="text-left-just">{{ $t('desc.about_me_two') }}</el-col>
        </el-row>
        <div class="mb-32"/>
        <el-row>
          <el-col :md="12">
            <span><b>{{ $t('label.nameUp') }}</b>: Rizki Khair</span>
            <div class="mb-8"/>
            <span><b>{{ $t('label.email') }}</b>: rizkikhair4658@gmail.com</span>
            <div class="mb-8"/>
            <span><b>{{ $t('label.phone') }}</b>: +62 8212 956 608</span>
            <div class="mb-8"/>
            <span><b>{{ $t('label.birth_date') }}</b>: Jan 13, 1995</span>
            <div class="mb-8"/>
            <span><b>{{ $t('label.address') }}</b>: {{ $t('desc.about_address') }}</span>
          </el-col>
        </el-row>
        <div class="mb-32"/>
        <el-row>
          <el-col :md="12" style="width: 180px;">
            <div class="color-warning font-xxl" style="font-weight: bolder;">
              0
            </div>
            <div>{{ $t('label.completed_project') }}</div>
          </el-col>
          <el-col :md="12" style="width: 180px;">
            <div class="color-success font-xxl" style="font-weight: bolder;">
              4
            </div>
            <div>{{ $t('label.running_project') }}</div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!--c8c8c8-->
    <el-card shadow="never" class="refresh" :body-style="{ backgroundColor: '#FFFFFF' }">
      <div class="mb-24">
        <el-button class="font-xxl" style="padding: 0px; background-color: transparent !important; border: 0px;">
          <span class="text-alfa">{{ $t('menu.skills') }}</span>
        </el-button>
      </div>
      <div class="mb-4 text-open font-md bold">
        <el-row>
          <el-col class="text-left-just">{{ $t('label.experience_skill') }}</el-col>
        </el-row>
      </div>
      <div class="mb-24 text-open font-sm">
        <el-row>
          <el-col :md="12" class="text-left-just">{{ $t('desc.about_skill') }}</el-col>
        </el-row>
      </div>
      <el-button type="text" @click="animationSkillUp"><i class="el-icon-plus"/></el-button>
      <el-button type="text" @click="animationSkillDown"><i class="el-icon-minus"/></el-button>
      <div class="mb-16 text-open font-md">
        <el-row :gutter="20">
          <el-col v-for="(skill, n) in valueSkill" :key="n" :md="8" class="mb-24">
            <el-row type="flex" justify="start" align="middle">
              <el-col
                :style="{ color: getStatusSkill(skill.value) }"
                class="font-lg"
                style="width: 32px; margin-right: 8px;">
                <svg-icon :icon-class="skill.icon"/>
              </el-col>
              <el-col>
                <div class="font-sm">{{ skill.name }}</div>
              </el-col>
              <el-col style="width: 32px; margin-left: 8px;">
                <div class="font-xs">{{ skill.value }}%</div>
              </el-col>
            </el-row>
            <el-progress
              :percentage="skill.value"
              :color="getStatusSkill(skill.value)"
              :show-text="false"
              type="line"
            />
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!--c8c8c8-->
    <el-card shadow="never" class="refresh" :body-style="{ backgroundColor: '#FFFFFF', paddingBottom: '0px' }">
      <div class="mb-24">
        <el-button class="font-xxl" style="padding: 0px; background-color: transparent !important; border: 0px;">
          <span class="text-alfa">{{ $t('menu.edu') }}</span>
        </el-button>
      </div>
      <br>
      <div style="width: 100%; margin: 16px auto 32px;">
        <el-timeline>
          <el-timeline-item v-for="(education, m) in educations" :key="m" placement="top" size="large">
            <el-card class="education" shadow="hover">
              <div class="font-lg"><svg-icon :icon-class="education.icon"/> {{ education.date }}</div>
              <div class="font-md">{{ education.name }}</div>
              <div v-if="education.gpa" class="font-md text-right">
                <svg-icon icon-class="star" class="award"/> {{ education.gpa }}
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>

    <el-card shadow="never" class="refresh" :body-style="{ backgroundColor: '#FFFFFF', paddingBottom: '0px' }">
      <div class="mb-24">
        <el-button class="font-xxl" style="padding: 0px; background-color: transparent !important; border: 0px;">
          <span class="text-alfa">{{ $t('menu.exp') }}</span>
        </el-button>
      </div>
      <br>
      <div style="width: 100%; margin: 16px auto;">
        <el-timeline>
          <div v-for="(experience, o) in experiences" :key="o" :hide-timestamp="true" placement="top" size="large">
            <div slot="dot"/>
            <el-card :body-style="{ padding: '24px !important' }" class="education" shadow="hover" style="max-width: 100%; text-align: justify;">
              <div class="font-lg mb-8"><svg-icon icon-class="work"/> {{ experience.date }}</div>
              <div class="font-lg">Front-End</div>
              <div class="font-md mb-8">{{ experience.company }}</div>
              <div v-if="o === 0" class="font-md">{{ $t('desc.reponsibility_devixel') }}</div>
              <div v-if="o === 1" class="font-md">{{ $t('desc.reponsibility_popaket') }}</div>
              <div v-if="o === 2" class="font-md">{{ $t('desc.reponsibility') }}</div>
            </el-card>
          </div>
        </el-timeline>
      </div>
      <br>
      <br>
    </el-card>

    <el-card shadow="never" class="refresh last" :body-style="{ backgroundColor: '#FFFFFF', paddingBottom: '0px' }">
      <div class="mb-8">
        <el-button class="font-xxl" style="padding: 0px; background-color: transparent !important; border: 0px;">
          <span class="text-alfa">{{ $t('label.others') }}</span>
        </el-button>
      </div>
      <br>
      <div style="width: 100%; margin: 0px auto 16px;">
        <el-row :gutter="20">
          <el-col :sm="12">
            <el-card :body-style="{ padding: '24px !important' }" class="education" shadow="never" style="max-width: 100%;">
              <div class="font-lg mb-8">{{ $t('menu.social_media') }}</div>
              <div v-for="(item_media, p) in media" :key="p" class="font-md">
                <el-button
                  style="padding: 8px 8px; border: 0px; background-color: transparent;">
                  <span class="font-lg">
                    <svg-icon :icon-class="item_media.icon"/>
                  </span>
                  &nbsp;{{ item_media.link }}
                </el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :sm="12">
            <el-card :body-style="{ padding: '24px !important' }" class="education" shadow="never" style="max-width: 100%;">
              <div class="font-lg mb-8">{{ $t('label.interest') }}</div>
              <el-button
                v-for="(item_interest, q) in interest" :key="q"
                style="padding: 8px 8px; border: 0px; background-color: transparent; margin: 0px 8px;">
                <div class="font-lg mb-8">
                  <svg-icon :icon-class="item_interest.icon"/>
                </div>
                <div>{{ item_interest.link }}</div>
              </el-button>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <br>
      <br>
    </el-card>

    <vue-html2pdf
      :show-layout="false"
      :enable-download="true"
      :preview-modal="false"
      :enableLinks="true"
      :paginate-elements-by-height="1400"
      :filename="'RIZKI KHAIR RESUME(' + $store.getters.language.toUpperCase() + ')'"
      :pdf-quality="2"
      :image="{ quality: 1 }"
      :manual-pagination="true"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      ref="html2Pdf"
      @progress="onProgress($event)"
      @hasStartedGeneration="hasStartedGeneration()"
      @hasGenerated="hasGenerated($event)">
      <section slot="pdf-content">
        <section slot="pdf-item">
          <div :style="{ backgroundImage: 'url(' + getUrlImage('about-header-gray.jpg', 'pp') + ')' }" style="padding: 24px 24px 32px; background-position: center; background-size: cover; background-repeat: no-repeat;">
            <div class="text-caveat" style="font-size: 48px; margin-bottom: -24px; color: #343A40">
              {{ $t('label.greetingMe') }}
            </div>
            <div class="text-alfa" style="font-size: 64px; margin-bottom: -16px; color: #343A40">
              Rizki Khair
            </div>
            <div style="font-size: 16px; color: #343A40">
              FRONTEND ENGINEER
            </div>
          </div>
        </section>

        <section slot="pdf-item">
          <div style="padding: 24px 24px 0px 24px;">
            <el-button class="font-lg" style="padding: 0px; background-color: transparent !important; border: 0px;">
              <span class="text-alfa font-xl" style="color: #343A40;">{{ $t('menu.about_me') }}</span>
            </el-button>
          </div>

          <div class="text-open font-sm" style="padding: 16px 24px 0px 24px;">
            <table class="font-xs" style="font-size: 12px; color: #343A40; width: 100%">
              <tr>
                <td style="width: 50%; color: #343A40; font-size: 12px;">
                  <div class="mb-8">
                    {{ $t('desc.about_me_one') }}
                  </div>
                  <div>
                    {{ $t('desc.about_me_two') }}
                  </div>
                </td>
                <td style="width: 50%; padding: 0px 0px 0px 100px; font-size: 12px; color: #343A40;">
                  <span><b>{{ $t('label.email') }}</b>: rizkikhair4658@gmail.com</span>
                  <div class="mb-8"/>
                  <span><b>{{ $t('label.phone') }}</b>: +62 8212 956 608</span>
                  <div class="mb-8"/>
                  <span><b>{{ $t('label.birth_date') }}</b>: {{ dateBirth }}</span>
                  <div class="mb-8"/>
                  <span><b>{{ $t('label.address') }}</b>: {{ $t('desc.about_address') }}</span>
                </td>
              </tr>
            </table>
            <div class="mb-8"/>
            <table>
              <tr>
                <td style="padding-right: 10px;">
                  <div class="color-warning font-xxl bold">0</div>
                  <div style="font-size: 12px;">{{ $t('label.completed_project') }}</div>
                </td>
                <td>
                  <div class="color-success font-xxl bold">4</div>
                  <div style="font-size: 12px;">{{ $t('label.running_project') }}</div>
                </td>
              </tr>
            </table>
          </div>
        </section>

        <section slot="pdf-item">
          <div style="padding: 24px 24px 0px 24px;">
            <el-button class="font-lg" style="padding: 0px; background-color: transparent !important; border: 0px;">
              <span class="text-alfa font-xl" style="color: #343A40;">{{ $t('menu.skills') }}</span>
            </el-button>
          </div>

          <div style="padding: 8px 24px; max-width: 300px;">
            <span class="bold" style="color: #343A40; font-size: 14px;">{{ $t('label.experience_skill') }}</span>
            <div style="font-size: 12px;">
              {{ $t('desc.about_skill') }}
            </div>
          </div>

          <div style="padding: 0px 24px 8px;">
            <el-row style="padding: 0px; margin: 0px;">
              <el-col v-for="(skillPrint, a) in valueSkill" :key="a" :span="8" style="padding: 8px;">
                <el-row :gutter="10" type="flex" justify="start" align="middle">
                  <el-col
                    :style="{ color: getStatusSkill(skillPrint.value) }"
                    class="font-lg"
                    style="width: 32px; margin-right: 4px;">
                    <el-image
                      :style="skillPrint.icon === 'php-1' ? 'width: 40px; height: 24px;' : 'width: 24px; height: 24px'"
                      :src="getUrlImage2(skillPrint.icon + '.svg')"
                    />
                  </el-col>
                  <el-col>
                    <div style="font-size: 12px;">{{ skillPrint.name }}</div>
                  </el-col>
                  <el-col style="width: 32px; margin-left: 8px;">
                    <div class="font-xs">{{ skillPrint.value }}%</div>
                  </el-col>
                </el-row>
                <div style="position: relative; width: 100%; height: 4px; background-color: #ebeef5; border-radius: 50px;">
                  <div :style="'background-color: '+ getStatusSkill(skillPrint.value) + '; width: ' + skillPrint.value + '%;'" style="position: absolute; top: 0px; left: 0px; height: 100%; border-radius: 10px;"/>
                </div>
              </el-col>
            </el-row>
          </div>
        </section>

        <div class="html2pdf__page-break"/>

        <section slot="pdf-item">
          <div style="padding: 24px 24px 0px 24px;">
            <el-button class="font-lg" style="padding: 0px; background-color: transparent !important; border: 0px;">
              <span class="text-alfa font-xl" style="color: #343A40;">{{ $t('menu.exp') }}</span>
            </el-button>
          </div>
          <div v-for="(experience, n) in experiences" :key="n" style="padding: 24px 24px 8px;">
            <table>
              <tr>
                <td>
                  <div
                    style="margin: 0px 8px;">
                    <div style="display: flex; flex-wrap: nowrap;">
                      <div><i class="el-icon-suitcase font-xl"/></div>
                      <div class="font-lg">&nbsp;{{ experience.date }}</div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <td>
                  <div
                    style="margin: 0px 8px; padding: 0px 0px 0px;">
                    <div style="display: flex; flex-wrap: nowrap;">
                      <div>
                        <div class="font-lg">{{ experience.desc }}</div>
                        <div class="font-md mb-8">{{ experience.company }}</div>
                        <div class="font-sm">{{ experience.explain }}</div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </section>

        <section slot="pdf-item">
          <div style="padding: 24px 24px 0px 24px;">
            <el-button class="font-lg" style="padding: 0px; background-color: transparent !important; border: 0px;">
              <span class="text-alfa font-xl" style="color: #343A40;">{{ $t('menu.edu') }}</span>
            </el-button>
          </div>
          <div style="padding: 24px 24px 8px;">
            <table style="width: 100%;">
              <tr v-for="(education, b) in educations" :key="b">
                <td>
                  <div
                    style="margin: 0px 8px;">
                    <div style="display: flex; flex-wrap: nowrap;">
                      <div><img :src="`/static/img/svg/${education.icon}.svg`" style="width: 24px; height: 24px;"/></div>
                      <div>
                        <div class="font-lg">&nbsp;&nbsp;{{ education.date }}</div>
                        <div class="font-md">&nbsp;&nbsp;{{ education.name }}</div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </section>

        <section slot="pdf-item">
          <div style="padding: 24px 24px 0px 24px;">
            <el-button class="font-lg" style="padding: 0px; background-color: transparent !important; border: 0px;">
              <span class="text-alfa font-xl" style="color: #343A40;">{{ $t('label.others') }}</span>
            </el-button>
          </div>
          <div style="padding: 24px 24px 8px;">
            <el-row>
              <el-col :span="12">
                <div class="font-lg mb-8">{{ $t('menu.social_media') }}</div>
                <div v-for="(item_media, b) in media" :key="b">
                  <div style="display: flex; flex-wrap: nowrap; justify-content: flex-start; align-items: center;">
                    <div class="font-sm">
                      <img :src="getUrlImage2(item_media.icon + '.svg')" height="20" width="20">&nbsp;
                    </div>
                    <div class="font-sm">
                      &nbsp; {{ item_media.link }}
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </section>
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>
import moment from '@/utils/moment.js'
export default {
  name: 'PageAbout',
  props: ['active'],
  data () {
    return {
      activeName: 'first',
      activatedMenu: '2',
      windowWidth: 0,
      showMenu: false,
      fullscreenLoading: false,
      valueSkill: [
        {
          value: 55,
          name: 'Adobe Photoshop',
          icon: 'photoshop'
        },
        {
          value: 45,
          name: 'Adobe XD',
          icon: 'xd'
        },
        {
          value: 30,
          name: 'Adobe Illustrator',
          icon: 'ai'
        },
        {
          value: 90,
          name: 'HTML',
          icon: 'html5'
        },
        {
          value: 90,
          name: 'CSS',
          icon: 'css3'
        },
        {
          value: 90,
          name: 'Javascript',
          icon: 'js'
        },
        {
          value: 50,
          name: 'Node JS',
          icon: 'node'
        },
        {
          value: 60,
          name: 'MySql',
          icon: 'mysql-2'
        },
        {
          value: 60,
          name: 'PHP',
          icon: 'php-1'
        },
        {
          value: 80,
          name: 'Vue',
          icon: 'vue'
        },
        {
          value: 75,
          name: 'React',
          icon: 'react'
        },
        {
          value: 60,
          name: 'Laravel',
          icon: 'laravel'
        },
        {
          value: 70,
          name: 'Git',
          icon: 'github-1'
        },
        {
          value: 70,
          name: 'Type Script',
          icon: 'typescript'
        }
      ],
      educations: [
        {
          date: '2014 - 2018',
          name: 'POLITEKNIK PIKSI GANESHA BANDUNG',
          gpa: this.$t('label.gpa') + '(3.16)',
          icon: 'mortarboard'
        }
      ],
      experiences: [
        {
          company: 'PT. Devixel Teknologi Indonesia',
          date: this.$store.getters.language === 'en' ? 'April 2021 - Present' : 'April 2021 - Sekarang',
          desc: 'Front-End',
          place: 'Bandung',
          explain: this.$t('desc.reponsibility_devixel')
        },
        {
          company: 'PT.Tradaru Digital (Popaket)',
          date: this.$store.getters.language === 'en' ? 'April 2021 - July 2021' : 'April 2021 - Juli 2021',
          desc: 'Front-End',
          place: 'Bandung',
          explain: this.$t('desc.reponsibility_popaket')
        },
        {
          company: 'PT. Olsera Indonesia Pratama (Zenwel)',
          date: this.$store.getters.language === 'en' ? 'Aug 2019 - Mar 2021' : 'Agt 2019 - Mar 2021',
          desc: 'Front-End',
          place: 'Yogyakarta',
          explain: this.$t('desc.reponsibility')
        }
      ],
      media: [
        {
          icon: 'instagram-2-1',
          link: 'rizkikhair',
          host: 'www.instagram.com/rizkikhair'
        },
        {
          icon: 'github-1',
          link: 'rizuki4658',
          host: 'www.github.com/rizuki4658'
        }
      ],
      interest: [
        {
          name: this.$t('label.soccer'),
          icon: 'soccer',
          type: 'svg'
        },
        {
          name: this.$t('label.techno'),
          icon: 'idea',
          type: 'png'
        },
        {
          name: this.$t('label.movies'),
          icon: 'video-camera',
          type: 'svg'
        },
        {
          name: this.$t('label.music'),
          icon: 'music',
          type: 'svg'
        },
        {
          name: this.$t('label.game'),
          icon: 'vr-gaming',
          type: 'svg'
        }
      ],
      dateNow: moment(new Date(Date.now())).format('DD MMMM YYYY'),
      dateBirth: this.$store.getters.language === 'en' ? 'Jan 13, 1995' : '13 Jan, 1995',
      loadingUnprint: false
    }
  },

  computed: {
    sizeImage () {
      if (this.windowWidth > 560) {
        return 120
      } else if (this.windowWidth <= 560) {
        return 80
      } else if (this.windowWidth <= 380) {
        return 56
      }
    },
    activeCv () {
      return this.active
    },
    nameFile () {
      return '(' + this.dateNow + ')' + 'Rizki Khair'
    }
  },

  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    back () {
      this.$emit('back')
    },
    handleShowMenu () {
      this.showMenu = true
    },
    handleHideMenu () {
      this.showMenu = false
    },
    async handleMenu (id) {
      this.activatedMenu = ''
      this.fullscreenLoading = true
      if (id === '1') this.back()
      await this.delay(800)
      this.activatedMenu = id
      this.fullscreenLoading = false
    },
    handleResize () {
      this.windowWidth = window.innerWidth
      if (window.innerWidth <= 768) {
        this.showMenu = false
      } else {
        this.showMenu = true
      }
    },
    delay (time) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
      })
    },
    getUrlImage (image, type) {
      let images = ''
      if (type === 'pp') {
        images = require.context('../../assets/pp', false, /\.(png|jpe?g|gif|svg)(\?.*)?$/)
      }
      return images('./' + image)
    },
    getUrlImage2 (image) {
      let images = require.context('../../assets/svg/', false, /\.(png|jpe?g|gif|svg)(\?.*)?$/)
      return images('./' + image)
    },
    getStatusSkill (value) {
      let color = ''
      if (value <= 30) color = '#DC3545'
      if (value > 30 && value <= 49) color = '#FFC107'
      if (value > 49 && value <= 59) color = '#007BFF'
      if (value > 59 && value <= 79) color = '#30bac5'
      if (value > 79) color = '#40EE95'
      return color
    },
    async animationSkillDown () {
      this.valueSkill.map(x => {
        if (x.value > 0) x.value = 0
      })
    },
    animationSkillUp () {
      this.valueSkill.map(x => {
        this.$store.getters.skills.map(y => {
          if (x.name === y.name) x.value = y.value
        })
      })
    },
    download () {
      this.loadingUnprint = true
      this.$refs.html2Pdf.generatePdf()
    },
    onProgress (event) {
      if (event >= 100) this.loadingUnprint = false
    },
    hasStartedGeneration () {
    },
    hasGenerated (event) {
    }
  }
}
</script>
