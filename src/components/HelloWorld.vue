<template>
<div class="">
    商品名称：<input type="text" v-model="name"><button type="button" @click="addProduct">添加</button>
    <ul>
        <li v-for="item in products" :key="item.id">{{ item.name }}</li>
    </ul>
</div>
</template>

<script>
import { queryAllProduct, insertProduct } from '@/utils/db'

export default {
  name: 'HelloWorld',
  data () {
    return {
      products: [],
      name: ''
    }
  },
  computed: {
    latestId () {
      if (this.products.length) {
        return this.products[this.products.length - 1].id
      }
      return 0
    }
  },
  mounted () {
    queryAllProduct().then(data => {
      this.products = data
    })
  },
  methods: {
    addProduct () {
      if (this.name) {
        let product = {
          id: this.latestId + 1,
          name: this.name
        }
        insertProduct(product).then(() => {
          this.products.push(product)
          this.name = ''
        })
      }
    }
  }
}
</script>
