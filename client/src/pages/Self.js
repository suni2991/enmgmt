import React from 'react'

import { Collapse, Button } from 'antd';

const { Panel } = Collapse;

function Self() {
  return (
    <div style={{ padding:'20px', display:'flex', flexDirection:'row', height:'100%'}}>
       <div className="main-section">
       
            <input type="text" placeholder="Search Employee by name"/>
         
          <div className="announcements-section">
           
            <div className="announcement-box">
            <h2>Management Announcements</h2>
            </div>
          </div>
          <div className="post-section">
            <h3>Knowledge Management, Share any post to your employees</h3>
            <input type="text" placeholder="Add your Post Here"  width={'80%'}/>
            <h3>Test Employee:</h3>Here is the sample post i have posted
            <p style={{textDecoration:'underline', color:'blue'}}>View More Posts- It will show the list of posts posted by other employees of EnFuse</p>
          </div>
        </div>

          <div className="sidePanel">
          <Collapse defaultActiveKey={['1']}>
            <Panel header="Birthday Wishes" key="1">
              <div className="wishes-section">
               
                <p className="wish-item">Birthday</p>
                <p className="wish-item">Work Anniversaries</p>
              </div>
            </Panel>
            <Panel header="Work Anniversary" key="2">
              <div className="wishes-section">
               
                <p className="wish-item">Work Anniversaries</p>
              </div>
            </Panel>


            <Panel header="Leaves Availability" key="3">
              <p>Leaves Report</p>
            </Panel>

            <Panel header="Holidays" key="4">
              <p>List of Holidays</p>
            </Panel>
            <Panel header="Payroll" key="5">
              <p>Payroll</p>
            </Panel>
            <Panel header="Policies" key="6">
              <p>Organization Docs</p>
            </Panel>
            <Panel header="Refer" key="7">
              <p>Refer a Friend to EnFuse</p>
            </Panel>
            <Panel header="E-Connect" key="8">
              <p>E-Connect</p>
            </Panel>
           
          </Collapse>
        </div>
    </div>
  )
}

export default Self