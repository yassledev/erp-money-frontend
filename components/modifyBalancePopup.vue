<template>
  <b-modal
    :id="id"
    ref="modal"
    :title="title"
    :ok-disabled="enableOk"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form">
      <b-form-group
        v-if="title !== 'Payer'"
        label="Montant"
        label-for="amount-input"
        invalid-feedback="Amount is required"
        :state="amountState"
      >
        <b-form-input
          v-if="title !== 'Payer'"
          id="amount-input"
          v-model="amount"
          type="number"
          step="0.01"
          :state="amountState"
          required
        />
      </b-form-group>
      Type paiement <br>
      <select v-if="title === 'Payer'" v-model="type" class="form-select" required>
        <option v-for="(item) in typesPaiement" :key="item.id">
          {{ item.label }}
        </option>
      </select>
      <select v-else v-model="type" class="form-select" required>
        <option v-for="(item) in typesPaiementAddBalance" :key="item.id">
          {{ item.label }}
        </option>
      </select>
      <div v-if="title === 'Payer'">
        Produit <br>
        <select v-model="produit" class="form-select" required>
          <option v-for="(item) in products['products']" :key="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
    </form>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ModifyBalancePopup',
  props: {
    title: {
      type: String,
      default: undefined
    },
    id: {
      type: String,
      default: undefined
    },
    negative: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      amount: null,
      amountState: null,
      typesPaiementAddBalance: [
        { id: 1, type: 'card', label: 'Carte de crédit' },
        { id: 2, type: 'cash', label: 'Espèce' }
      ],
      typesPaiement: [
        { id: 1, type: 'card', label: 'Carte de crédit' },
        { id: 2, type: 'cash', label: 'Espèce' },
        { id: 3, type: 'member', label: 'Solde' }
      ],
      fieldProduct: ['id', 'name'],
      type: null,
      produit: null
    }
  },
  computed: {
    ...mapState('product', [
      'products'
    ]),
    enableOk () {
      if (this.title === 'Payer') {
        return !(this.type !== null && this.produit !== null)
      } else {
        return !(this.type !== null && this.amount !== null && this.amount !== '')
      }
    }
  },
  created () {
    this.$store.dispatch('product/getProducts')
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.amountState = valid
      return valid
    },
    resetModal () {
      this.amount = null
      this.amountState = null
    },
    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit () {
      if (!this.checkFormValidity()) {
        return
      }
      if (this.title === 'Payer') {
        const transac = {
          payment: {
            type: this.typesPaiement.find(item => item.label === this.type).type
          },
          products: [{
            id: this.products.products.find(item => item.name === this.produit).id,
            quantity: 1
          }]
        }
        this.$emit('save', transac)
      } else {
        const newAmount = {
          amount: this.amount
        }
        this.$emit('save', newAmount)
      }
      this.type = null
      this.produit = null
      this.amount = null
      this.amountState = null
      this.$nextTick(() => {
        this.$bvModal.hide(this.id)
      })
    }
  }
}
</script>
