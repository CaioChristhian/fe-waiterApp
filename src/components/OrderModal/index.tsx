import { useEffect } from 'react';
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';

import * as S from './styles';

interface OrderModalProps {
	visible: boolean;
	order: Order | null;
	onClose: () => void;
}

export function OrderModal({ visible, order, onClose }: OrderModalProps){
	if (!visible || !order) {
		return null;
	}

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				onClose();
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [onClose]);

	// let total = 0;
	// order.products.forEach(({ product, quantity }) => {
	//	total += product.price * quantity;
	// });

	const total = order.products.reduce((total, { product, quantity}) => {
		return total + (product.price * quantity);
	}, 0);

	return (
		<S.Overlay>
			<S.ModelBody>
				<header>
					<strong>Mesa {order.table}</strong>
					<button type='button'>
						<img src={closeIcon} alt='close' onClick={onClose} />
					</button>
				</header>

				<div className="status-container">
					<small>Status do Pedido</small>
					<div>
						<span>
							{order.status === 'WAITING' && '🕑'}
							{order.status === 'IN_PRODUCTION' && '👩‍🍳'}
							{order.status === 'DONE' && '✅'}
						</span>

						<strong>
							{order.status === 'WAITING' && 'Fila de espera'}
							{order.status === 'IN_PRODUCTION' && 'Em preparação'}
							{order.status === 'DONE' && 'Pronto!'}
						</strong>
					</div>
				</div>

				<S.OrderDetails>
					<strong>Itens</strong>

					<div className="order-items">
						{order.products.map(({ _id, product, quantity }) => (
							<div className="item" key={_id}>
								<img
									src={`http://localhost:3001/uploads/${product.imagePath}`}
									alt={product.name}
									width="56"
									height="28.51"
								/>

								<span className='quantity'>
									{quantity}x
								</span>

								<div className="product-details">
									<strong>{product.name}</strong>
									<span>{formatCurrency(product.price)}</span>
								</div>
							</div>
						))}
					</div>

					<div className="total">
						<span>Total</span>
						<strong>{formatCurrency(total)}</strong>
					</div>
				</S.OrderDetails>

				<S.Actions>
					<button type='button' className="primary">
						<span>👩‍🍳</span>
						<strong>Iniciar Produção</strong>
					</button>

					<button type='button' className="secondary">
						Cancelar Pedido
					</button>
				</S.Actions>
			</S.ModelBody>
		</S.Overlay>
	);
}
