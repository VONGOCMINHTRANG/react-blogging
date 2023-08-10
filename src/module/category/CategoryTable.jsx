import { IconActionDelete, IconActionEdit, IconActionView } from 'components/icon'
import { LabelStatus } from 'components/label'
import { Table } from 'components/table'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { categoryStatus } from 'utils/constants'
import Swal from 'sweetalert2'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import CategoryInfo from './CategoryInfo'
import { PATH } from 'utils/path'
import { useTranslation } from 'react-i18next'

const CategoryTableStyles = styled.div`
  overflow-x: auto;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  @media (max-width: 540px) {
    .th,
    td {
      font-size: calc(0.6em + 0.5vw);
    }
  }
  @media (min-width: 541px) and (max-width: 949px) {
    .th,
    td {
      font-size: calc(0.6em + 0.5vw);
    }
  }
`

const CategoryTable = ({ data }) => {
  const { t } = useTranslation()
  const dataCategory = useRef([])
  const navigate = useNavigate()
  const [info, setInfo] = useState(false)

  const handleDeleteCategory = async (docId) => {
    const colRef = doc(db, 'categories', docId)
    Swal.fire({
      title: t('Are you sure?'),
      text: t("You won't be able to revert this category!"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('Yes, delete it!'),
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(t('Deleted!'), t('Your file has been deleted.'), 'success')
        await deleteDoc(colRef)
      }
    })
  }

  const handleViewInfo = (category) => {
    dataCategory.current = category
    setInfo(true)
  }

  return (
    <CategoryTableStyles className="table-menu">
      <Table>
        <thead>
          <tr>
            <th>{t(`Id`)}</th>
            <th>{t(`Name`)}</th>
            <th>{t(`Slug`)}</th>
            <th>{t(`Status`)}</th>
            <th>{t(`Actions`)}</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((category) => (
              <tr key={category?.id}>
                <td title={category?.id}>{category?.id.slice(0, 5) + '...'}</td>
                <td>{category?.name}</td>
                <td>
                  <span className="italic text-gray-400">{category?.slug}</span>
                </td>
                <td>
                  {Number(category?.status) === categoryStatus.APPROVED ? (
                    <LabelStatus type="success">{t(`Approved`)}</LabelStatus>
                  ) : (
                    <LabelStatus type="danger">{t(`Unapproved`)}</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex justify-center categorys-center gap-x-3">
                    <IconActionView onClick={() => handleViewInfo(category)}></IconActionView>
                    <IconActionEdit
                      onClick={() =>
                        navigate(`${PATH.dashboard.update_category}?id=${category?.id}`)
                      }
                    ></IconActionEdit>
                    <IconActionDelete
                      onClick={() => handleDeleteCategory(category?.id)}
                    ></IconActionDelete>
                  </div>
                </td>
              </tr>
            ))}

          {info && <CategoryInfo info={info} setInfo={setInfo} data={dataCategory}></CategoryInfo>}
        </tbody>
      </Table>
    </CategoryTableStyles>
  )
}

CategoryTable.propTypes = {
  data: PropTypes.array,
}

export default CategoryTable
