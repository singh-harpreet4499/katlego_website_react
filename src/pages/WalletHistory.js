
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { wallet_history_api } from '../components/server/api';
import defaultImage from '../libs/images/wallet.png'
const WalletHistory = (props) => {
    const {user_login} = props;

    const [wallet_history,setWalletHistory] = useState([]);

    useEffect(() => {
        wallet_history_api({
            limit:500,
            offset:0
        }).then((resp)=>{
            if(resp.status){
                setWalletHistory(resp.data)
            }
        })
    }, [])

    return (
        <>
            <div className="page-content pb-0">

                <div className="container">

                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <img src={defaultImage} alt="Wallet" width="100" className="mb-3" />
                                    <h4>Available Wallet Balance</h4>
                                    <h2 className="rat"><strong>₹ {user_login ? user_login.wallet : 0}</strong></h2>
                                    <div className="submit-section mt-3">
                                        <Link to={{pathname:'/recharge-wallet'}} className="btn btn-primary add-mon">Add Money to wallet</Link>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-12 col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Wallet Summary</h4>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover  table-striped-1 table-center mb-0">
                                            <thead style={{backgroundColor:'#f7f7f7'}}>
                                                <tr>
                                                    <th>Txn ID</th>
                                                    <th>Date{' & '}Time </th>
                                                    <th>Description</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    wallet_history.map((walletdata)=>{
                                                        return (
                                                            <tr>
                                                                <td>{walletdata.order_txn_id}</td>
                                                                <td>{walletdata.created_at}</td>
                                                                <td>Money {walletdata.type}</td>
                                                                <td>₹ {walletdata.txn_amount}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default WalletHistory