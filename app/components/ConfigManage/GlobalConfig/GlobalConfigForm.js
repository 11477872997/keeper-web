import React, {Component} from 'react'
import {Button, Form, Input, Popconfirm, Popover} from 'antd'
import {FormattedMessage} from 'react-intl'

const FormItem = Form.Item

@Form.create()
export default class GlobalConfigForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSave = () => {
    const {onSave} = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const content = {}
        Object.keys(values).forEach(key => {
          content[key.replace(/@@@/g, '.')] = values[key]
        })
        const {config} = this.props
        onSave({...config, ...content})
      }
    })
  }

  handleInit = options => {
    const {onInit} = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const content = {}
        Object.keys(values).forEach(key => {
          content[key.replace(/@@@/g, '.')] = values[key]
        })
        const {config} = this.props
        onInit(options, {...config, ...content})
      }
    })
  }

  handleInitGrafana = () => {
    this.handleInit('grafana')
  }

  handleInitInfluxdb = () => {
    this.handleInit('influxdb')
  }

  handleInitStorm = () => {
    this.handleInit('storm')
  }

  handleInitHeartbeat = () => {
    this.handleInit('heartBeat')
  }

  handleInitZk = () => {
    this.handleInit('zk')
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: {span: 4},
        sm: {span: 4}
      },
      wrapperCol: {
        xs: {span: 19},
        sm: {span: 12}
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 12,
          offset: 4,
        },
        sm: {
          span: 12,
          offset: 4,
        }
      }
    }

    const {config} = this.props
    return (
      <div>
        <Form className="heartbeat-advance-config-form">
          <FormItem label={<FormattedMessage id="app.components.configCenter.globalConfig.dbus.cluster.server.list"
                                             defaultMessage="dbus?????????????????????"/>} {...formItemLayout}>
            {getFieldDecorator('dbus@@@cluster@@@server@@@list', {
              initialValue: config['dbus.cluster.server.list'],
              rules: [
                {
                  required: true,
                  message: '????????????'
                }
              ]
            })(
              <Input placeholder="?????????dbus?????????????????????" size="large" type="text"/>
            )}
          </FormItem>
          <FormItem label={<FormattedMessage id="app.components.configCenter.globalConfig.dbus.cluster.ssh.port"
                                             defaultMessage="dbus?????????????????????"/>} {...formItemLayout}>
            {getFieldDecorator('dbus@@@cluster@@@server@@@ssh@@@port', {
              initialValue: config['dbus.cluster.server.ssh.port'],
              rules: [
                {
                  required: true,
                  message: '????????????'
                }
              ]
            })(
              <Input placeholder="?????????dbus?????????????????????" size="large" type="text"/>
            )}
          </FormItem>
          <FormItem label={<FormattedMessage id="app.components.configCenter.globalConfig.dbus.cluster.ssh.user"
                                             defaultMessage="dbus?????????????????????"/>} {...formItemLayout}>
            {getFieldDecorator('dbus@@@cluster@@@server@@@ssh@@@user', {
              initialValue: config['dbus.cluster.server.ssh.user'],
              rules: [
                {
                  required: true,
                  message: '????????????'
                }
              ]
            })(
              <Input placeholder="?????????dbus?????????????????????" size="large" type="text"/>
            )}
          </FormItem>
          <FormItem label={<FormattedMessage
            id="app.components.configCenter.globalConfig.zkServers"
            defaultMessage="ZK????????????"
          />} {...formItemLayout}>
            {getFieldDecorator('zk@@@str', {
              initialValue: config['zk.str'],
              rules: [
                {
                  required: true,
                  message: '????????????'
                }
              ]
            })(
              <Input placeholder="?????????ZK????????????" size="large" type="text"/>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Popconfirm title={'???????????????ZK?????????'} onConfirm={this.handleInitZk} okText="Yes" cancelText="No">
              <Popover content={'??????/DBus/ConfTemplates????????????,?????????zk??????dbus????????????,?????????????????????????????????'} title="?????????ZK??????"
                       trigger="hover">
                <Button type="danger">
                  <FormattedMessage
                    id="app.components.configCenter.globalConfig.initZk"
                    defaultMessage="??????????????????????????????ZK??????"
                  />
                </Button>
              </Popover>
            </Popconfirm>
          </FormItem>
          <FormItem label={<FormattedMessage id="app.components.configCenter.globalConfig.bootstrapServers"
                                             defaultMessage="Kafka????????????"
          />} {...formItemLayout}>
            {getFieldDecorator('bootstrap@@@servers', {
              initialValue: config['bootstrap.servers'],
              rules: [
                {
                  required: true,
                  message: '????????????'
                }
              ]
            })(
              <Input placeholder="?????????Kafka????????????" size="large" type="text"/>
            )}
          </FormItem>
          <FormItem label={<FormattedMessage id="app.components.configCenter.globalConfig.bootstrapServersVersion"
                                             defaultMessage="Kafka??????"/>} {...formItemLayout}>
            {getFieldDecorator('bootstrap@@@servers@@@version', {
              initialValue: config['bootstrap.servers.version'],
              rules: [
                {
                  required: true,
                  message: '????????????'
                }
              ]
            })(
              <Input placeholder="?????????kafka??????" size="large" type="text"/>
            )}
          </FormItem>
          <FormItem label={<FormattedMessage id="app.components.configCenter.globalConfig.grafanaUrl"
                                             defaultMessage="Grafana????????????"/>} {...formItemLayout}>
            {getFieldDecorator('grafana@@@web@@@url', {
              initialValue: config['grafana.web.url'],
              rules: [
                {
                  required: true,
                  message: '????????????'
                }
              ]
            })(
              <Input placeholder="?????????Grafana????????????" size="large" type="text"/>
            )}
          </FormItem>
          <FormItem label={<FormattedMessage id="app.components.configCenter.globalConfig.grafanaInnerUrl"
                                             defaultMessage="Grafana????????????"/>} {...formItemLayout}>
            {getFieldDecorator('grafana@@@dbus@@@url', {
              initialValue: config['grafana.dbus.url'],
              rules: [
                {
                  required: true,
                  message: '????????????'
                }
              ]
            })(
              <Input placeholder="?????????Grafana????????????" size="large" type="text"/>
            )}
          </FormItem>
          <FormItem label='Grafana Token' {...formItemLayout}>
            {getFieldDecorator('grafana@@@token', {
              initialValue: config['grafana.token'],
              rules: [
                {
                  required: true,
                  message: '????????????'
                }
              ]
            })(
              <Input placeholder="?????????Grafana Token" size="large" type="text"/>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Popconfirm title={'???????????????Grafana???'} onConfirm={this.handleInitGrafana} okText="Yes" cancelText="No">
              <Popover content={'??????data source,??????Grafana Dashboard?????????'} title="?????????Grafana" trigger="hover">
                <Button type="danger">
                  <FormattedMessage
                    id="app.components.configCenter.globalConfig.initGrafana"
                    defaultMessage="??????????????????????????????Grafana"
                  />
                </Button>
              </Popover>
            </Popconfirm>
          </FormItem>
          <FormItem label={<FormattedMessage id="app.components.configCenter.globalConfig.influxdbUrl"
                                             defaultMessage="Influxdb????????????"/>} {...formItemLayout}>
            {getFieldDecorator('influxdb@@@web@@@url', {
              initialValue: config['influxdb.web.url'],
              rules: [
                {
                  required: true,
                  message: '????????????'
                }
              ]
            })(
              <Input placeholder="?????????Influxdb????????????" size="large" type="text"/>
            )}
          </FormItem>
          <FormItem label={<FormattedMessage id="app.components.configCenter.globalConfig.influxdbInnerUrl"
                                             defaultMessage="Influxdb????????????"/>} {...formItemLayout}>
            {getFieldDecorator('influxdb@@@dbus@@@url', {
              initialValue: config['influxdb.dbus.url'],
              rules: [
                {
                  required: true,
                  message: '????????????'
                }
              ]
            })(
              <Input placeholder="?????????Influxdb????????????" size="large" type="text"/>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Popconfirm title={'???????????????Influxdb???'} onConfirm={this.handleInitInfluxdb} okText="Yes" cancelText="No">
              <Popover content={'????????????????????????,????????????????????????15??????'} title="?????????Influxdb" trigger="hover">
                <Button type="danger">
                  <FormattedMessage
                    id="app.components.configCenter.globalConfig.initInfluxdb"
                    defaultMessage="??????????????????????????????Influxdb"
                  />
                </Button>
              </Popover>
            </Popconfirm>
          </FormItem>
          <FormItem label={<FormattedMessage id="app.components.configCenter.globalConfig.stormNimbusHost"
                                             defaultMessage="Storm Nimbus???????????????"/>} {...formItemLayout}>
            {getFieldDecorator('storm@@@nimbus@@@host', {
              initialValue: config['storm.nimbus.host'],
              rules: [
                {
                  required: true,
                  message: '????????????'
                }
              ]
            })(
              <Input placeholder="?????????Storm Nimbus???????????????" size="large" type="text"/>
            )}
          </FormItem>
          <FormItem label={<FormattedMessage
            id="app.components.configCenter.globalConfig.stormHomePath"
            defaultMessage="Storm Nimbus?????????"
          />} {...formItemLayout}>
            {getFieldDecorator('storm@@@nimbus@@@home@@@path', {
              initialValue: config['storm.nimbus.home.path'],
              rules: [
                {
                  required: true,
                  message: '????????????'
                }
              ]
            })(
              <Input placeholder="?????????Storm Nimbus?????????" size="large" type="text"/>
            )}
          </FormItem>
          <FormItem label={<FormattedMessage
            id="app.components.configCenter.globalConfig.stormLogPath"
            defaultMessage="Storm???????????????"
          />} {...formItemLayout}>
            {getFieldDecorator('storm@@@nimbus@@@log@@@path', {
              initialValue: config['storm.nimbus.log.path'],
              rules: [
                {
                  required: true,
                  message: '????????????'
                }
              ]
            })(
              <Input placeholder="?????????Storm???????????????" size="large" type="text"/>
            )}
          </FormItem>
          <FormItem label={<FormattedMessage
            id="app.components.configCenter.globalConfig.stormUIRestApi"
            defaultMessage="Storm UI????????????"
          />} {...formItemLayout}>
            {getFieldDecorator('storm@@@rest@@@url', {
              initialValue: config['storm.rest.url'],
              rules: [
                {
                  required: true,
                  message: '????????????'
                }
              ]
            })(
              <Input placeholder="?????????Storm UI????????????" size="large" type="text"/>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Popconfirm title={'???????????????Storm???'} onConfirm={this.handleInitStorm} okText="Yes" cancelText="No">
              <Popover content={'????????????????????????,?????????????????????jar??????????????????'} title="???????????????Storm"
                       trigger="hover">
                <Button type="danger">
                  <FormattedMessage
                    id="app.components.configCenter.globalConfig.initStorm"
                    defaultMessage="??????????????????????????????Storm"
                  />
                </Button>
              </Popover>
            </Popconfirm>
          </FormItem>
          <FormItem label={<FormattedMessage
            id="app.components.configCenter.globalConfig.heartbeatIP"
            defaultMessage="?????????????????????"
          />} {...formItemLayout}>
            {getFieldDecorator('heartbeat@@@host', {
              initialValue: config['heartbeat.host'],
              rules: [
                {
                  required: true,
                  message: '????????????'
                }
              ]
            })(
              <Input placeholder="??????????????????????????????" size="large" type="text"/>
            )}
          </FormItem>
          <FormItem label={<FormattedMessage
            id="app.components.configCenter.globalConfig.heartbeatPath"
            defaultMessage="?????????????????????"
          />} {...formItemLayout}>
            {getFieldDecorator('heartbeat@@@path', {
              initialValue: config['heartbeat.path'],
              rules: [
                {
                  required: true,
                  message: '????????????'
                }
              ]
            })(
              <Input placeholder="??????????????????????????????" size="large" type="text"/>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Popconfirm title={'????????????????????????'}
                        onConfirm={this.handleInitHeartbeat} okText="Yes" cancelText="No">
              <Popover content={'????????????????????????,??????????????????????????????,????????????????????????!'} title="?????????????????????" trigger="hover">
                <Button type="danger">
                  <FormattedMessage
                    id="app.components.configCenter.globalConfig.initHeartbeat"
                    defaultMessage="??????????????????????????????Heartbeat"
                  />
                </Button>
              </Popover>
            </Popconfirm>
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Popconfirm title={'???????????????????????????'} onConfirm={this.handleSave} okText="Yes" cancelText="No">
              <Button type="primary">
                <FormattedMessage
                  id="app.components.configCenter.globalConfig.saveConfig"
                  defaultMessage="??????????????????"
                />
              </Button>
            </Popconfirm>
          </FormItem>
        </Form>
      </div>
    )
  }
}

GlobalConfigForm.propTypes = {}
