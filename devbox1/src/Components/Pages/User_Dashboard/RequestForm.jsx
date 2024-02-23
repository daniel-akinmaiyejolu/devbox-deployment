import React, { useState } from 'react';
import './Style.css';
import { useRequestContext } from './RequestContext';

function Popup(props) {
  const { state, handleSubmit } = useRequestContext();
  const [environmentName, setEnvironmentName] = useState('');
  const [environmentType, setEnvironmentType] = useState('dev');
  const [service, setService] = useState('Virtual Machine');
  const [tier, setTier] = useState('Low');
  const [subscriptionId, setSubscriptionId] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      environmentName,
      environmentType,
      service,
      tier,
      subscriptionId,
      requestDate: new Date().toISOString(),
      approvalStatus: 'pending'
    };
    await handleSubmit(requestData);
  };

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button className='close-btn' onClick={() => props.setTrigger(false)}>x</button>
                <h2>Request New Environment</h2>
                {state.loading && <p>Sending request...</p>}
          {state.success && <p>Request submitted successfully!</p>}
          {state.error && <p>Error: {state.error}</p>}
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Environment Name:</label>
                        <input 
                            type="text" 
                            id="environemt-name" 
                            name="Environment Name" 
                            value={environmentName}
                            onChange={(e) => setEnvironmentName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="envtype">Environment Type:</label>
                        <select 
                            id="envtype" 
                            value={environmentType}
                            onChange={(e) => setEnvironmentType(e.target.value)}
                        >
                            <option value="dev">Development</option>
                            <option value="staging">Staging</option>
                            <option value="production">Production</option>       
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="service">Service:</label>
                        <select 
                            id="service"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                        >
                            <option value="Virtual Machine">Vitual Machine</option>
                            <option value="Web App">WebApp</option>
                            <option value="Databricks">Azure Databricks</option>
                            <option value="Database">Azure SQL</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tier">Tier:</label>
                        <select 
                            id="tier"
                            value={tier}
                            onChange={(e) => setTier(e.target.value)}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="subscription">Subscription:</label>
                        <input 
                            type="text" 
                            id="subscription" 
                            name="Subscription Id" 
                            value={subscriptionId}
                            onChange={(e) => setSubscriptionId(e.target.value)}
                        />
                    </div>
                    <input type="submit" value="Submit" className="submit-button" />
                </form>
            </div>
        </div>
    ) : "";
}

export default Popup;
