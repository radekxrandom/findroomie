import React from 'react';

const ListItem = (props) => {
	return (
		<div className="container">
			<div className="well" style={{ margin: '1%' }}>
				<div className="list-group">
					<a
						href={`http://localhost:3000/ad/${props.item._id}`}
						className="list-group-item"
					>
						<div className="media col-md-3">
							<figure className="pull-left">
								<img
									className="media-object img-rounded img-responsive"
									src={`http://localhost:9000/static/${props.item.img}`}
									alt="placehold.it/350x250"
								/>
							</figure>
						</div>
						<div className="col-md-6">
							<h4 className="list-group-item-heading">{props.item.title}</h4>
							<p className="list-group-item-text">{props.item.message}</p>
						</div>
						<div className="col-md-3 text-center">
							<h2>
								{' '}
								14240 <small> votes </small>
							</h2>
							<button
								type="button"
								className="btn btn-default btn-lg btn-block"
							>
								{' '}
								Vote Now!{' '}
							</button>
						</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default ListItem;
