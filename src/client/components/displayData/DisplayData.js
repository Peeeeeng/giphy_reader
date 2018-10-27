import React, { Component } from 'react'
import { connect } from 'react-redux'

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';


let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => {
        console.log('StableSort')
        console.log(el)
        console.log(index)
        return [el, index]
    });
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    console.log('getSorting')
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'embed_url', numeric: false, disablePadding: false, label: 'Image' },
    { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
    { id: 'id', numeric: true, disablePadding: false, label: 'Id' },
    { id: 'rating', numeric: false, disablePadding: false, label: 'Rating' },
    { id: 'slug', numeric: false, disablePadding: false, label: 'Slug' },
    { id: 'import_datetime', numeric: true, disablePadding: false, label: 'Import Date' },
    { id: 'trending_datetime', numeric: true, disablePadding: false, label: 'Trending Date' },
    { id: 'username', numeric: false, disablePadding: false, label: 'Author' },
    { id: '_score', numeric: true, disablePadding: false, label: 'Score' },
];


class EnhancedTableHead extends Component {
    createSortHandler = property => event => {
      this.props.onRequestSort(event, property);
    };
  
    render() {
      const { order, orderBy } = this.props;
  
      return (
        <TableHead>
          <TableRow>

            {rows.map(row => {
              return (
                <TableCell
                  key={row.id}
                  numeric={row.numeric}
                  padding={row.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === row.id ? order : false}
                >
                  <Tooltip
                    title="Sort"
                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              );
            }, this)}
          </TableRow>
        </TableHead>
      );
    }
  }
  
EnhancedTableHead.propTypes = {
// numSelected: PropTypes.number.isRequired,
onRequestSort: PropTypes.func.isRequired,
// onSelectAllClick: PropTypes.func.isRequired,
order: PropTypes.string.isRequired,
orderBy: PropTypes.string.isRequired,
rowCount: PropTypes.number.isRequired,
};
  
  const toolbarStyles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
  });
  
let EnhancedTableToolbar = props => {
const { numSelected, classes } = props;

return (
    <Toolbar
    className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
    })}
    >
    <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
            Gifs
        </Typography>
    </div>
    <div className={classes.spacer} />
    <div className={classes.actions}>
        <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
            <FilterListIcon />
            </IconButton>
        </Tooltip>
    </div>
    </Toolbar>
);
};
  
EnhancedTableToolbar.propTypes = {
classes: PropTypes.object.isRequired,
// numSelected: PropTypes.number.isRequired,
};
  
EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);
  
const styles = theme => ({
root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
},
table: {
    minWidth: 1020,
},
tableWrapper: {
    overflowX: 'auto',
},
});
  
class DisplayData extends Component {
    constructor(props){
        super(props)
        this.state = {
            order: 'asc',
            orderBy: 'id',
            // selected: [],
            data: this.props.gifArr || [
            // createData('Cupcake', 305, 3.7, 67, 4.3),
            // createData('Donut', 452, 25.0, 51, 4.9),
            // createData('Eclair', 262, 16.0, 24, 6.0),
            // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
            // createData('Gingerbread', 356, 16.0, 49, 3.9),
            // createData('Honeycomb', 408, 3.2, 87, 6.5),
            // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
            // createData('Jelly Bean', 375, 0.0, 94, 0.0),
            // createData('KitKat', 518, 26.0, 65, 7.0),
            // createData('Lollipop', 392, 0.2, 98, 0.0),
            // createData('Marshmallow', 318, 0, 81, 2.0),
            // createData('Nougat', 360, 19.0, 9, 37.0),
            // createData('Oreo', 437, 18.0, 63, 4.0),
            ],
            page: 0,
            rowsPerPage: 5,
        };
    }
    

static getDerivedStateFromProps(props, state){
    // console.log('yeah')
    // console.log(props.gifArr)
    // console.log('new props coming')
    state = {...state, data: props.gifArr}
    return state
}

handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
    order = 'asc';
    }

    this.setState({ order, orderBy });
};

handleSelectAllClick = event => {
    // if (event.target.checked) {
    // this.setState(state => ({ selected: state.data.map(n => n.id) }));
    // return;
    // }
    // this.setState({ selected: [] });
};

handleClick = (event, id) => {
    // const { selected } = this.state;
    // const selectedIndex = selected.indexOf(id);
    // let newSelected = [];

    // if (selectedIndex === -1) {
    // newSelected = newSelected.concat(selected, id);
    // } else if (selectedIndex === 0) {
    // newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    // newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    // newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1),
    // );
    // }

    // this.setState({ selected: newSelected });
};

handleChangePage = (event, page) => {
    this.setState({ page });
};

handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
};

isSelected = id => this.state.selected.indexOf(id) !== -1;

render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    // console.log(this.state.data)
    return (
    <Paper className={classes.root}>
        <EnhancedTableToolbar /*numSelected={selected.length}*/ />
        <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
            // numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            // onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}
            rowCount={data.length}
            />
            <TableBody>
            {
                stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                // const isSelected = this.isSelected(n.id);
                console.log('this is inside maping to table')
                console.log(n)
                return (
                    <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    role="checkbox"
                    // aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    // selected={isSelected}
                    >
                    {/* <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                    </TableCell> */}
                    <TableCell>
                        <img src={n.images.fixed_height_small.url} alt={n.slug} />
                    </TableCell>
                    <TableCell numeric>{n.title}</TableCell>
                    <TableCell numeric>{n.id}</TableCell>
                    <TableCell numeric>{n.rating}</TableCell>
                    <TableCell numeric>{n.slug}</TableCell>
                    <TableCell numeric>{n.import_datetime}</TableCell>
                    <TableCell numeric>{n.trending_datetime}</TableCell>
                    <TableCell numeric>{n.username}</TableCell>
                    <TableCell numeric>{n._score}</TableCell>
                    </TableRow>
                );
                })}
            {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={6} />
                </TableRow>
            )}
            </TableBody>
        </Table>
        </div>
        <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
            'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
            'aria-label': 'Next Page',
        }}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
    </Paper>
    );
}
}
  
DisplayData.propTypes = {
classes: PropTypes.object.isRequired,
};


const mapState = (state) => {
    return {
        gifArr: state.gifArr
    }
}

export default withStyles(styles)(connect(mapState, null)(DisplayData))