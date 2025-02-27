import React from 'react';

import { Select, HorizontalGroup, Input } from '@grafana/ui';

import { TraceqlFilter } from '../dataquery.gen';

import { operatorSelectableValue } from './utils';

interface Props {
  filter: TraceqlFilter;
  updateFilter: (f: TraceqlFilter) => void;
  isTagsLoading?: boolean;
  operators: string[];
}

const validationRegex = /^\d+(?:\.\d)?\d*(?:us|µs|ns|ms|s|m|h)$/;

const DurationInput = ({ filter, operators, updateFilter }: Props) => {
  let invalid = false;
  if (typeof filter.value === 'string') {
    invalid = filter.value ? !validationRegex.test(filter.value.concat('')) : false;
  }

  return (
    <HorizontalGroup spacing={'none'}>
      <Select
        inputId={`${filter.id}-operator`}
        options={operators.map(operatorSelectableValue)}
        value={filter.operator}
        onChange={(v) => {
          updateFilter({ ...filter, operator: v?.value });
        }}
        isClearable={false}
        aria-label={`select ${filter.id} operator`}
        allowCustomValue={true}
        width={8}
      />
      <Input
        value={filter.value}
        onChange={(v) => {
          updateFilter({ ...filter, value: v.currentTarget.value });
        }}
        placeholder="e.g. 100ms, 1.2s"
        aria-label={`select ${filter.id} value`}
        invalid={invalid}
        width={18}
      />
    </HorizontalGroup>
  );
};

export default DurationInput;
