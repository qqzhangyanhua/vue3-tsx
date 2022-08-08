/*
 * @Author: ZYH
 * @Date: 2022-08-08 08:59:32
 * @LastEditTime: 2022-08-08 09:49:16
 * @Description:
 */
import { defineComponent } from 'vue';
import Draggable from 'vuedraggable';
import { activeItem, copyItem, deleteItem, setDefaultValue } from '../useDrawing';

export default defineComponent({
  setup() {
    const activeId = 1; //prop的
    const formConf: any = {};
    const components = {
      itemBtns(h: any, currentItem: any, index: number, list: any) {
        // const { copyItem, deleteItem } = this.$listeners;
        return [
          <span
            class="drawing-item-copy"
            title="复制"
            onClick={(event) => {
              copyItem(currentItem, list);
              event.stopPropagation();
            }}
          >
            <i class="el-icon-copy-document" />
          </span>,
          <span
            class="drawing-item-delete"
            title="删除"
            onClick={(event) => {
              deleteItem(index, list);
              event.stopPropagation();
            }}
          >
            <i class="el-icon-delete" />
          </span>,
        ];
      },
    };
    const layouts = {
      colFormItem(h: any, currentItem: any, index: number, list: any) {
        const config = currentItem.__config__;
        const child = renderChildren(h, currentItem, index, list);
        let className =
          activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item';
        if (formConf.unFocusedComponentBorder) className += ' unfocus-bordered';
        let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null;
        if (config.showLabel === false) labelWidth = '0';
        return (
          <el-col
            span={config.span}
            class={className}
            nativeOnClick={(event: any) => {
              activeItem(currentItem);
              event.stopPropagation();
            }}
          >
            <el-form-item
              label-width={labelWidth}
              label={config.showLabel ? config.label : ''}
              required={config.required}
            >
              <render key={config.renderKey} conf={currentItem} onInput={setDefaultValue}>
                {child}
              </render>
            </el-form-item>
            {components.itemBtns(h,currentItem,index,list)}
          </el-col>
        );
      },
      rowFormItem(h: any, currentItem: any, index: number, list: any) {
        const config = currentItem.__config__;
        const className =
          activeId === config.formId ? 'drawing-row-item active-from-item' : 'drawing-row-item';
        let child = renderChildren(h,currentItem,index,list)as any;
        if (currentItem.type === 'flex') {
          child = (
            <el-row type={currentItem.type} justify={currentItem.justify} align={currentItem.align}>
              {child}
            </el-row>
          );
        }
        return (
          <el-col span={config.span}>
            <el-row
              gutter={config.gutter}
              class={className}
              nativeOnClick={(event: any) => {
                activeItem(currentItem);
                event.stopPropagation();
              }}
            >
              <span class="component-name">{config.componentName}</span>
              <draggable
                list={config.children || []}
                animation={340}
                group="componentsGroup"
                class="drag-wrapper"
              >
                {child}
              </draggable>
              {components.itemBtns(h,currentItem,index,list)}
            </el-row>
          </el-col>
        );
      },
      raw(h: any, currentItem: any, index: number, list: any) {
        const config = currentItem.__config__;
        const child = renderChildren(h,currentItem,index,list);
        return (
          <render key={config.renderKey} conf={currentItem} onInput={setDefaultValue}>
            {child}
          </render>
        );
      },
    };
    function renderChildren(h: any, currentItem: any, index: any, list: any) {
    //   const config = currentItem.__config__;
    //   if (!Array.isArray(config.children)) return null;
    //   return config.children.map((el: any, i: number) => {
    //     const layout = layouts[el.__config__.layout];
    //     if (layout) {
    //       return layout.call(this, h, el, i, config.children);
    //     }
    //     return layoutIsNotFound.call(this);
    //   });
    }

    // function layoutIsNotFound() {
    //   throw new Error(`没有与${this.currentItem.__config__.layout}匹配的layout`);
    // }
    return () => <div>tsx</div>;
  },
});
