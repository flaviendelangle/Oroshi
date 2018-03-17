import React, { PureComponent } from 'react'
import ScrollArea from 'react-scrollbar'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import cx from 'classnames'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { List } from 'material-ui/List'

import Line from './Line/index'
import Progress from './Progress/index'
import {
  importCSV as _importCSV,
  importJSON as _importJSON,
  importElements,
} from '../../../services/actions/collections/index'
import { connect } from '../../../services/redux'

import styles from './DataImporter.scss'


class DataImporter extends PureComponent {
  static propTypes = {
    progress: PropTypes.number.isRequired,
    importCSV: PropTypes.func.isRequired,
    importJSON: PropTypes.func.isRequired,
    importContent: PropTypes.func.isRequired,
    importFromFile: PropTypes.object,
    created: PropTypes.object,
  }

  state = {
    source: 'csv',
    csv: null,
    json: null,
    error: '',
  }

  componentWillReceiveProps(newProps) {
    const { importFromFile, importContent } = this.props
    if (
      !importFromFile &&
      newProps.importFromFile
    ) {
      const { data } = newProps.importFromFile
      if (data.error) {
        this.setState(() => ({
          error: data.error,
        }))
      } else {
        this.setState(() => ({
          error: '',
        }))
        importContent(newProps.importFromFile.data)
      }
      this.setState(() => ({ elements: newProps.importFromFile.data }))
    }
  }

  updateFile = (format, upload) => {
    this.setState(() => ({ [format]: upload[0] }))
  }

  /**
   * Handle the click to launch the importation
   */
  handleClick = () => {
    const { importCSV, importJSON } = this.props
    const { source, csv, json } = this.state
    switch (source) {
      case 'csv': {
        importCSV(csv)
        break
      }
      case 'json': {
        importJSON(json)
        break
      }
      default:
        break
    }
  }

  render() {
    const { error, elements, source } = this.state
    const { progress, created } = this.props

    const dropZoneClasses = cx({
      [styles.DropZone]: true,
      [styles.DropZoneFilled]: !!this.state[source],
    })

    return (
      <div className={styles.DataImporter}>
        <div>{ error }</div>
        <div className={styles.Content}>
          <SelectField
            floatingLabelText="Source"
            value={this.state.source}
            className={styles.Source}
            onChange={(proxy, index, newSource) => this.setState(() => ({ source: newSource }))}
          >
            <MenuItem value="csv" primaryText="CSV File" />
            <MenuItem value="json" primaryText="JSON File" />
          </SelectField>
        </div>
        {
          source &&
          <div>
            <Dropzone
              onDrop={upload => this.updateFile(source, upload)}
              multiple={false}
              accept={`.${source}`}
              className={dropZoneClasses}
            >
              {() => {
                if (this.state[source]) {
                  return 'File dropped successfully'
                }
                return `Click to pick your ${source.toUpperCase()} file`
              }}
            </Dropzone>
            {
              this.state[source] &&
              <RaisedButton
                label="Import !"
                className={styles.Button}
                onClick={this.handleClick}
              />
            }
          </div>
        }
        {
          !error &&
          elements &&
          <div className={styles.ImportResults} >
            <Progress progress={progress} />
            <List>
              <ScrollArea
                speed={0.8}
                horizontal={false}
              >
                {this.state.elements.map((el, index) => (
                  <Line
                    title={el.title}
                    key={index} // eslint-disable-line react/no-array-index-key
                    done={!!created[el.tmdbId]}
                  />
                ))}
              </ScrollArea>
            </List>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ settings: { dataImporter } }) => ({
  importFromFile: dataImporter.importFromFile,
  progress: dataImporter.progress,
  created: dataImporter.created,
})

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  importCSV: file => dispatch(_importCSV(type, collection, file)),
  importJSON: file => dispatch(_importJSON(type, collection, file)),
  importContent: (elements) => {
    dispatch(importElements(type, collection, elements, dispatch))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataImporter)
