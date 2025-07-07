import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { AVTUseEffect, AVTUseState } from "../../customHooks";
import { API } from "../../services/API/api";

// 🔶 Global filter format
export interface FilterDto {
  PageNo: number;
  PageSize: number;
  Predicates: Record<string, string | number | boolean>;
}

type CommonGridProps<T> = {
  apiUrl: string;
  showEdit?: boolean;
  showDelete?: boolean;
  onEditClick?: (row: T) => void;
  onDeleteClick?: (row: T) => void;
};

function CommonGrid<T extends { Id?: string | number; id?: string | number }>({
  apiUrl,
  showEdit = false,
  showDelete = false,
  onEditClick,
  onDeleteClick,
}: CommonGridProps<T>) {
  const [rows, setRows] = AVTUseState<T[]>("CommonGrid-rows", []);
  const [columns, setColumns] = AVTUseState<GridColDef[]>("CommonGrid-cols", []);
  const [page, setPage] = AVTUseState<number>("CommonGrid-page", 0);
  const [pageSize, setPageSize] = AVTUseState<number>("CommonGrid-pageSize", 10);
  const [loading, setLoading] = AVTUseState<boolean>("CommonGrid-loading", false);

  const loadData = async () => {
    setLoading(true);

    const filter: FilterDto = {
      PageNo: page + 1,
      PageSize: pageSize,
      Predicates: {},
    };

    try {
      // ⛳ API returns plain array like: T[]
      const response = await API.POST<T[]>(apiUrl, filter);
      const data = response ?? [];

      // 🧱 Generate columns from object keys
      const baseColumns: GridColDef[] = Object.keys(data[0] || {}).map((key) => ({
        field: key,
        headerName: key,
        flex: 1,
      }));

      if (showEdit || showDelete) {
        baseColumns.push({
          field: "actions",
          headerName: "Actions",
          width: 120,
          sortable: false,
          filterable: false,
          renderCell: (params: GridRenderCellParams<T>) => (
            <>
              {showEdit && (
                <IconButton onClick={() => onEditClick?.(params.row)}>
                  <EditIcon color="primary" />
                </IconButton>
              )}
              {showDelete && (
                <IconButton onClick={() => onDeleteClick?.(params.row)}>
                  <DeleteIcon color="error" />
                </IconButton>
              )}
            </>
          ),
        });
      }

      setRows(data);
      setColumns(baseColumns);
    } catch (error) {
      console.error("CommonGrid API load error:", error);
    } finally {
      setLoading(false);
    }
  };

  AVTUseEffect(
    "CommonGrid-load",
    () => {
      loadData();
    },
    [page, pageSize]
  );

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={({ page, pageSize }) => {
          setPage(page);
          setPageSize(pageSize);
        }}
        loading={loading}
        pagination
        getRowId={(row) => row.Id ?? row.id}
      />
    </div>
  );
}

export default CommonGrid;
