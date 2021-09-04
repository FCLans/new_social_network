import * as React from 'react'
import { User } from './User/User'
import styles from './Users.module.css'
import { UserType } from '../../types/types'
import { Paginator } from '../common/Paginator/Paginator'
import { createTheme, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import classnm from 'classnames/bind'

type PropsType = {
  currentPage: number
  users: Array<UserType>
  pageSize: number
  totalItemsCount: number
  isFollowingProgress: Array<number>

  onClickPage: (numberPage: number) => void
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}
//
// const useStyles = makeStyles({
//   table: {
//     width: '800px',
//   },
//   row: {
//     color: '#333333',
//   },
//   cellActive: {
//     color: '#228007',
//   },
//   cellStatusDefault: {
//     color: '#808080',
//   },
// })

export const Users = (props: PropsType) => {
  // const classes = useStyles()
  // const cn = classnm.bind(classes)
  //
  // const data = [
  //   { id: 1, nameProgram: 'PRO Фасилитация', date: '24.05.2021', progress: 25, status: 'В процессе' },
  //   { id: 2, nameProgram: 'Как составить индивидуальный план развития', date: '23.04.2021', progress: 100, status: 'Пройдено' },
  //   { id: 3, nameProgram: 'Программа развития руководителей ДОС', date: '23.04.2021', progress: 100, status: 'Пройдено' },
  // ]
  // const rows = data
  //
  // const theme = createTheme({
  //   typography: {
  //     fontFamily: 'Segoe UI',
  //     fontSize: 14,
  //   },
  // })
  //
  // return (
  //   <ThemeProvider theme={theme}>
  //     <TableContainer>
  //       <Table>
  //         <TableHead>
  //           <TableRow>
  //             <TableCell align="left">Учебная программа</TableCell>
  //             <TableCell align="center">Дата назначения</TableCell>
  //             <TableCell align="center">Прогресс</TableCell>
  //             <TableCell align="left">Статус</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {rows.map((row, index) => {
  //             const classNames = cn({
  //               cellStatusDefault: row.progress !== 100,
  //               cellActive: row.progress === 100,
  //             })
  //
  //             return (
  //               <TableRow key={index} className={classes.row}>
  //                 <TableCell align="left">{row.nameProgram}</TableCell>
  //                 <TableCell align="center">{row.date}</TableCell>
  //                 <TableCell align="center">{row.progress}</TableCell>
  //                 <TableCell align="left" className={classNames}>
  //                   {row.status}
  //                 </TableCell>
  //               </TableRow>
  //             )
  //           })}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //   </ThemeProvider>
  return (
    <div className={styles.usersBlock}>
      <Paginator
        currentPage={props.currentPage}
        onClickPage={props.onClickPage}
        totalItemsCount={props.totalItemsCount}
        pageSize={props.pageSize}
        portionSize={20}
      />
      {props.users.map((u) => (
        <User unfollow={props.unfollow} follow={props.follow} key={u.id} user={u} isFollowingProgress={props.isFollowingProgress} />
      ))}
    </div>
  )
}
