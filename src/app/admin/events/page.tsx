"use client"

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface DataTableProps<T> {
  columns: {
    accessorKey: keyof T
    header: string
    cell?: (info: { getValue: () => any }) => React.ReactNode
  }[]
  data: T[]
  searchable?: boolean
  pagination?: boolean
}

export default function DataTable<T>({
  columns,
  data,
  searchable = true,
  pagination = true,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [visibleColumns, setVisibleColumns] = useState<Set<keyof T>>(
    new Set(columns.map((col) => col.accessorKey))
  )

  // Filter data based on search term
  const filteredData = React.useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [data, searchTerm])

  // Sort data
  const sortedData = React.useMemo(() => {
    if (sortColumn) {
      return [...filteredData].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    }
    return filteredData
  }, [filteredData, sortColumn, sortDirection])

  // Paginate data
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedData, currentPage, itemsPerPage])

  const pageCount = Math.ceil(sortedData.length / itemsPerPage)

  const handleSort = (column: keyof T) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const toggleColumnVisibility = (column: keyof T) => {
    setVisibleColumns((prev) => {
      const next = new Set(prev)
      if (next.has(column)) {
        next.delete(column)
      } else {
        next.add(column)
      }
      return next
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {searchable && (
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.accessorKey as string}
                className="capitalize"
                checked={visibleColumns.has(column.accessorKey)}
                onCheckedChange={() => toggleColumnVisibility(column.accessorKey)}
              >
                {column.header}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                visibleColumns.has(column.accessorKey) && (
                  <TableHead key={column.accessorKey as string} className="font-medium">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort(column.accessorKey)}
                    >
                      {column.header}
                      {sortColumn === column.accessorKey && (
                        <ChevronDown
                          className={`ml-2 h-4 w-4 transition-transform ${
                            sortDirection === 'desc' ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </Button>
                  </TableHead>
                )
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  visibleColumns.has(column.accessorKey) && (
                    <TableCell key={column.accessorKey as string}>
                      {column.cell
                        ? column.cell({ getValue: () => row[column.accessorKey] })
                        : row[column.accessorKey]?.toString()}
                    </TableCell>
                  )
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="h-8 w-16 rounded-md border border-input bg-background"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              Page {currentPage} of {pageCount}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(pageCount)}
              disabled={currentPage === pageCount}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}