<template>
  <div class="container">
    <b-link to="/">
      <b-icon icon="arrow-left" />
    </b-link><span>   Retour</span>
    <NavBar>
    </NavBar><br><br><br>
    <div>
      <div>
        {{ user.lastname }} {{ user.firstname }}
      </div>
      <div class="row">
        <div class="col-2">
          <b-img class="img-fluid" src="../../static/logoUser.jpg" fluid alt="/" />
          <div class="information">
            <p class="informationItem">
              Solde de l'utilisateur : {{ user.balance }} €
            </p>
            <b-button class="mb-2" v-b-modal.modal-add-money block variant="primary">
              <span class="text-white">Ajouter de l'argent</span>
            </b-button>
            <b-button v-b-modal.modal-remove-money block variant="success">
              <span class="text-white">Acheter un produit</span>
            </b-button>
          </div>
        </div>
        <div class="transactions col-10">
          <div v-if="!transactionsByUser.length" > Pas encore de transaction !</div>
          <div v-else>
            <div></div>
            <h4>
              Historique des transactions
            </h4>
            <b-table :fields="fieldsTransaction" :items="transactionsByUser" class="list" responsive striped />
          </div>
        </div>
      </div>
    </div>
    <modify-balance-popup id="modal-add-money" title="Ajouter de l'argent" @save="addAmount($event)" />
    <modify-balance-popup id="modal-remove-money" title="Payer" :negative="true" @save="modifyBalance($event)" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BIcon, BIconArrowLeft } from 'bootstrap-vue'
import modifyBalancePopup from '~/components/modifyBalancePopup.vue'
import NavBar from '~/pages/navbar.vue'
export default {
  name: 'HomePage',
  components: {
    modifyBalancePopup,
    BIcon,
    NavBar,
    // eslint-disable-next-line vue/no-unused-components
    BIconArrowLeft
  },
  data () {
    return {
      fieldsTransaction: [
        {
          key: 'name',
          label: 'Intitulé'
        },
        {
          key: 'payment_type',
          label: 'Type de paiement'
        },
        {
          key: 'quantity',
          label: 'Quantité'
        },
        {
          key: 'date',
          label: 'Date'
        },
        {
          key: 'price',
          label: 'Montant (€)'
        }
      ]
    }
  },
  computed: {
    id () {
      return this.$route.params.userId
    },
    ...mapState('user', [
      'user'
    ]),
    ...mapState('transaction', [
      'transactionsByUser'
    ])
  },
  created () {
    this.$store.dispatch('user/getUser', this.$route.params.userId)
    this.$store.dispatch('transaction/getTransactionsByUser', this.$route.params.userId)
  },
  methods: {
    async modifyBalance (transac) {
      await this.$store.dispatch('user/pay', {
        user_id: this.$route.params.userId,
        products: transac.products,
        payment: transac.payment
      })
      this.$store.dispatch('user/getUser', this.$route.params.userId)
      this.$store.dispatch('transaction/getTransactionsByUser', this.$route.params.userId)
    },
    async addAmount (newAmount) {
      await this.$store.dispatch('user/updateBalanceUser', {
        user_id: this.$route.params.userId,
        amount: newAmount.amount
      })
      this.$store.dispatch('user/getUser', this.$route.params.userId)
      this.$store.dispatch('transaction/getTransactionsByUser', this.$route.params.userId)
    }
  }
}
</script>

<style>
 .container {
    width:100%;
  }
  .userListLogo {
    display: flex;
  }

  .list {
    max-height: 250px;
  }

  .avatar {
    max-height: 250px;
    max-width: 250px;
  }

</style>
