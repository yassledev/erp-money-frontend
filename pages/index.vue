<template>
  <div class="container">
    <NavBar></NavBar><br><br><br>
    <div>
      <div class="userListLogo">
        <b-img alt="/" fluid src="../static/imageBde.PNG" />
        <div class="transactionListContainer">
          <h4>
            Historique des transactions
          </h4>
          <b-table :fields="fieldsTransaction" :items="transactions" class="list" responsive striped />
        </div>
      </div>
    </div>
    <div class="memberListContainer">
      <h4>Liste des membres</h4>
      <b-table :fields="fieldsUser" :items="users" class="list" responsive striped>
        <template #cell(access_profile)="row">
          <b-button class="mr-2" size="sm" @click="openProfile(row)" variant="primary">
            <span class="text-white">Accéder au profil</span>
          </b-button>
        </template>
      </b-table>
    </div>
    <modify-balance-popup id="modal-add-money" title="Ajouter de l'argent" @save="modifyBalance($event)" />
    <modify-balance-popup
      id="modal-remove-money"
      :negative="true"
      title="Payer"
      @save="modifyBalance($event)"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import modifyBalancePopup from '~/components/modifyBalancePopup.vue'
import NavBar from '~/pages/navbar.vue'
export default {
  name: 'HomePage',
  components: { modifyBalancePopup, NavBar },
  data () {
    return {
      solde: 14000.00,
      fieldsTransaction: [
        {
          key: 'name',
          label: 'Intitulé'
        },
        {
          key: 'description',
          label: 'Description'
        },
        {
          key: 'createdAt',
          label: 'Date'
        },
        {
          key: 'value',
          label: 'Montant (€)'
        }
      ],
      fieldsUser: [
        {
          key: 'firstname',
          label: 'Prénom'
        },
        {
          key: 'lastname',
          label: 'Nom'
        },
        {
          key: 'email',
          label: 'E-mail'
        },
        {
          key: 'balance',
          label: 'Balance (€)'
        },
        {
          key: 'access_profile',
          label: ''
        }
      ]
    }
  },
  computed: {
    ...mapState('user', [
      'users'
    ]),
    ...mapState('transaction', [
      'transactions'
    ])
  },
  created () {
    this.$store.dispatch('user/getUsers')
    this.$store.dispatch('transaction/getTransactions')
  },

  methods: {
    modifyBalance (value) {
      this.solde = Number(this.solde) + Number(value)
    },
    openProfile (user) {
      this.$router.push('/user/' + user.item.id)
    }
  }
}
</script>

<style>
.container {
  width: 100%;
}

.informationItem {
  margin-right: 4px;
}

.userListLogo {
  display: flex;
}

.transactionListContainer {
  margin-left: 90px;
  width: 100%;
  max-height: 250px;
}

.list {
  max-height: 250px;
}

.memberListContainer {
  margin-top: 20px;
}
</style>
