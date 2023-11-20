
import { Order } from '../../types/Order';
import { OrdersBoard } from '../OrdersBoard';
import * as S from './styles';

const orders: Order[] = [
	{
		'_id': '652d8fece70da22a93d528aa',
		'table': '123',
		'status': 'WAITING',
		'products': [
			{
				'product': {
					'name': 'Pizza 4 queijos',
					'imagePath': '1697483184110-quatro-queijos.png',
					'price': 40,

				},
				'quantity': 3,
				'_id': '652d8fece70da22a93d528ab'
			},
			{
				'product': {
					'name': 'Coca-cola',
					'imagePath': '1697483982250-coca-cola.png',
					'price': 7,

				},
				'quantity': 2,
				'_id': '652d8fece70da22a93d528ac'
			}
		],
	}
];

export function Orders(){
	return (
		<S.Container>
			<OrdersBoard
				icon="🕑"
				title="Fila de espera"
				orders={orders}
			/>
			<OrdersBoard
				icon="👩‍🍳"
				title="Em preparação"
				orders={[]}
			/>
			<OrdersBoard
				icon="✅"
				title="Pronto!"
				orders={[]}
			/>
		</S.Container>
	);
}
