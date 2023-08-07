<script setup lang="ts">
import axios from 'axios';

const axiosCancelToken = axios.CancelToken.source();

const statisticsHorizontal = ref([
  {
    title: 'CPU Usage',
    color: 'primary',
    icon: 'tabler-cpu',
    stats: '0%',
  },
  {
    title: 'Memory Usage',
    color: 'success',
    icon: 'tabler-server',
    stats: '0%',
  },
  {
    title: 'Downtime Ratio',
    color: 'error',
    icon: 'tabler-chart-pie-2',
    stats: '0%',
  },
  {
    title: 'Visitor',
    color: 'warning',
    icon: 'tabler-user',
    stats: '0',
  },
])

const getServerInfo: any = async () => {
  try {
    const response = await axios.get('https://server-info.rzkmlna.tech/api/info', {
      cancelToken: axiosCancelToken.token,
    })

    // passing response to the statisticsHorizontal array
    statisticsHorizontal.value[0].stats = response.data.CPU.Usage
    statisticsHorizontal.value[1].stats = response.data.Memory.Used
  } catch (error) {
    // console.log(error)
  }
}

const getAnalytics: any = async () => {
  try {
    const response = await axios.get('https://hraapi.rzkmlna.tech/api/analytic?startDate=2020-03-31&endDate=today', {
      cancelToken: axiosCancelToken.token,
    })

    // passing response to the statisticsHorizontal array    
    statisticsHorizontal.value[3].stats = response.data.totalUser
  } catch (error) {
    // console.log(error)
  }
}

onMounted(() => {
  // every 60 seconds (60000ms) get server info
  getServerInfo()
  getAnalytics()
  setInterval(() => {
    getServerInfo()
    getAnalytics()
  }, 10000)
})

onBeforeUnmount(() => {
  axiosCancelToken.cancel('Request canceled due to route change');
})
</script>

<template>
  <div>
    <VCard>
      <div class="d-flex justify-content-between align-items-center px-1 py-2">
        <VCardTitle>Web Analytics</VCardTitle>
        <VCardSubtitle>Refreshed every 30 second</VCardSubtitle>
      </div>
      <VRow class="px-5 pb-5">
        <VCol v-for="statistics in statisticsHorizontal" :key="statistics.title" cols="12" sm="6" md="3">
          <VCard>
            <VCardText class="d-flex flex-row justify-content-between pb-2">
              <div>
                <h6 class="text-lg font-weight-medium">
                  {{ statistics.stats }}
                </h6>
                <span class="text-sm">{{ statistics.title }}</span>
              </div>
              <VAvatar v-if="statistics.icon" size="42" variant="tonal" :color="statistics.color" :icon="statistics.icon"
                class="mb-3" />
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>

<style lang="scss">
.justify-content-between {
  justify-content: space-between;
}

.align-items-center {
  align-items: center;
}
</style>
