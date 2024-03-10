/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";

import Select, { SelectInstance } from "react-select";

/** FontAwesome */
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** Models */
import { Airport } from "@/models";

/** Styles */
import s from "./PortSelectInput.module.scss";

interface PortSelectInputProps {
  icon: IconDefinition
  placeholder: string
  options?: Array<Airport>
}

const PortSelectInput = forwardRef(({ icon, options, placeholder }: PortSelectInputProps, ref) => {
  const selectRef = useRef<SelectInstance>(null);

  const formatOptionLabel = (data: any, opt: any) => {
    return <div className={s.option}><FontAwesomeIcon icon={icon} />{data?.label}</div>;
  };

  const CustomPlaceHolder = () => {
    return (
      <div className={s.placeholder}>
        <FontAwesomeIcon icon={icon} /> {placeholder}
      </div>
    );
  };

  const mappedOptions = useMemo(()=>{
    return options?.map((s) => {
      return { value: s.code, label: s.name, data: options };
    });
  },[options]);

  useImperativeHandle(ref,()=>({
    getValue() {
      return selectRef.current?.state.selectValue;
    }
  }))

  return (
    <Select
      ref={selectRef}
      className={s.select}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null
      }}
      options={mappedOptions}
      placeholder={<CustomPlaceHolder />}
      formatOptionLabel={formatOptionLabel}
      styles={{
        control: (_)=>({
          ..._,
          height: '50px',
          width: '200px'
        })
      }}
    />
  );
});

export default PortSelectInput;
