from toolz import recipes
from web3 import Web3

infura_url = 'https://ropsten.infura.io/v3/2ecaa080b94e46e49d2adbff0af8695e'
web3 = Web3(Web3.HTTPProvider(infura_url))

print(web3.isConnected())





sender = '0x924c90ae5233dA6F9eCf5838711ABfbE03DCEa30'
reciever = '0x66625d166aabC2f9e5675D8878b550bCc61e3A6b'


# print(web3.eth.coinbase())

hash = web3.eth.send_transaction({
  'to': reciever,
  'from': sender,
  'value': 12345
})
print(hash)