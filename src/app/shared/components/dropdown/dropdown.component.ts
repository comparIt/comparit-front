import {ScrollingModule, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {
  NgModule, Component, ElementRef, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked,
  OnDestroy, Input, Output, Renderer2, EventEmitter, ContentChildren,
  QueryList, ViewChild, TemplateRef, forwardRef, ChangeDetectorRef, NgZone, ViewRef
} from '@angular/core';
import {trigger, state, style, transition, animate, AnimationEvent} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {SelectItem} from 'primeng/api';
import {SharedModule, PrimeTemplate} from 'primeng/shared';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {TooltipModule} from 'primeng/tooltip';
import {DomHandler} from 'primeng/api';
import {ObjectUtils} from 'primeng/components/utils/objectutils';
import {FilterUtils} from 'primeng/api';
import {GlobalConfigurationService} from '../../services/globalConfiguration.service';

export const DROPDOWN_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownComponent),
  multi: true
};

@Component({
  selector: 'app-dropdown-item',
  template: `
    <li (click)="onOptionClick($event)" role="option"
        [attr.aria-label]="option.label"
        [ngStyle]=" this.selected
        ? {'height': itemSize + 'px', 'background-color': this.conf.colorPrimary}
        : {'height': itemSize + 'px'}"
        [ngClass]="{'ui-dropdown-item ui-corner-all': true,
                                                'ui-state-highlight': selected,
                                                'ui-state-disabled': (option.disabled),
                                                'ui-dropdown-item-empty': !option.label||option.label.length === 0}">
      <span *ngIf="!template">{{option.label || 'empty'}}</span>
      <ng-container *ngTemplateOutlet="template; context: {$implicit: option}"></ng-container>
    </li>
  `
})
export class DropdownItemComponent {

  constructor(public conf: GlobalConfigurationService) {}

  @Input() option: SelectItem;

  @Input() selected: boolean;

  @Input() disabled: boolean;

  @Input() visible: boolean;

  @Input() itemSize: number;

  @Input() template: TemplateRef<any>;

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  onOptionClick(event: Event) {
    this.onClick.emit({
      originalEvent: event,
      option: this.option
    });
  }
}

@Component({
  selector: 'app-dropdown',
  template: `
    <div #container [ngClass]="{'ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix':true,
            'ui-state-disabled':disabled, 'ui-dropdown-open':overlayVisible, 'ui-state-focus':focused,
            'ui-dropdown-clearable': showClear && !disabled}"
         (click)="onMouseclick($event)"
         [ngStyle]="focused
         ? {'display': 'block', 'min-width': 0, 'borderColor': '#a6a6a6'}
         : {'display': 'block', 'min-width': 0}"
         [class]="styleClass">
      <div class="ui-helper-hidden-accessible">

        <input #in [attr.id]="inputId" type="text"
               [attr.aria-label]="selectedOption ? selectedOption.label : ' '"
               readonly (focus)="onInputFocus($event)" aria-haspopup="listbox"
               (blur)="onInputBlur($event)" (keydown)="onKeydown($event, true)" [disabled]="disabled"
               [attr.tabindex]="tabindex" [attr.autofocus]="autofocus">
      </div>

      <div class="ui-helper-hidden-accessible ui-dropdown-hidden-select">
        <select [attr.required]="required" [attr.name]="name" tabindex="-1" aria-hidden="true">
          <option *ngIf="placeholder" value="">{{placeholder}}</option>
          <option *ngIf="selectedOption" [value]="selectedOption.value"
                  [selected]="true">{{selectedOption.label}}</option>
        </select>
      </div>

      <div class="ui-dropdown-label-container" [pTooltip]="tooltip" [tooltipPosition]="tooltipPosition"
           [positionStyle]="tooltipPositionStyle" [tooltipStyleClass]="tooltipStyleClass">
        <label
          [ngClass]="{'ui-dropdown-label ui-inputtext ui-corner-all':true,
          'ui-dropdown-label-empty':(label == null || label.length === 0)}"
          *ngIf="!editable && (label != null)">
          <ng-container *ngIf="!selectedItemTemplate">{{label || 'empty'}}</ng-container>
          <ng-container *ngTemplateOutlet="selectedItemTemplate; context: {$implicit: selectedOption}"></ng-container>
        </label>

        <label
          [ngClass]="{'ui-dropdown-label ui-inputtext ui-corner-all ui-placeholder':true,
          'ui-dropdown-label-empty': (placeholder == null || placeholder.length === 0)}"
          *ngIf="!editable && (label == null)">{{placeholder || 'empty'}}</label>
        <input #editableInput type="text" [attr.maxlength]="maxlength"
               [attr.aria-label]="selectedOption ? selectedOption.label : ' '"
               class="ui-dropdown-label ui-inputtext ui-corner-all" *ngIf="editable" [disabled]="disabled"
               [attr.placeholder]="placeholder"
               (click)="onEditableInputClick($event)" (input)="onEditableInputChange($event)"
               (focus)="onEditableInputFocus($event)" (blur)="onInputBlur($event)">
        <i class="ui-dropdown-clear-icon pi pi-times" (click)="clear($event)"
           *ngIf="value != null && showClear && !disabled"></i>
      </div>
      <div class="ui-dropdown-trigger ui-state-default ui-corner-right">
        <span class="ui-dropdown-trigger-icon ui-clickable" [ngClass]="dropdownIcon"></span>
      </div>
      <div *ngIf="overlayVisible" [ngClass]="'ui-dropdown-panel  ui-widget ui-widget-content ui-corner-all ui-shadow'"
           [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions,
            hideTransitionParams: hideTransitionOptions}}"
           (@overlayAnimation.start)="onOverlayAnimationStart($event)" [ngStyle]="panelStyle" [class]="panelStyleClass">
        <div *ngIf="filter" class="ui-dropdown-filter-container" (click)="$event.stopPropagation()">
          <input #filter type="text" autocomplete="off" [value]="filterValue||''"
                 class="ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all"
                 [attr.placeholder]="filterPlaceholder"
                 (keydown.enter)="$event.preventDefault()" (keydown)="onKeydown($event, false)"
                 (input)="onFilter($event)" [attr.aria-label]="ariaFilterLabel">
          <span class="ui-dropdown-filter-icon pi pi-search"></span>
        </div>
        <div class="ui-dropdown-items-wrapper" [style.max-height]="virtualScroll ? 'auto' : (scrollHeight||'auto')">
          <ul class="ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"
              role="listbox">
            <ng-container *ngIf="group">
              <ng-template ngFor let-optgroup [ngForOf]="optionsToDisplay">
                <li class="ui-dropdown-item-group">
                  <span *ngIf="!groupTemplate">{{optgroup.label || 'empty'}}</span>
                  <ng-container *ngTemplateOutlet="groupTemplate; context: {$implicit: optgroup}"></ng-container>
                </li>
                <ng-container
                  *ngTemplateOutlet="itemslist; context: {$implicit: optgroup.items, selectedOption: selectedOption}">

                </ng-container>
              </ng-template>
            </ng-container>
            <ng-container *ngIf="!group">
              <ng-container
                *ngTemplateOutlet="itemslist; context: {$implicit: optionsToDisplay, selectedOption: selectedOption}">

              </ng-container>
            </ng-container>
            <ng-template #itemslist let-options let-selectedOption="selectedOption">

              <ng-container *ngIf="!virtualScroll; else virtualScrollList">
                <ng-template ngFor let-option let-i="index" [ngForOf]="options">
                  <app-dropdown-item [option]="option" [selected]="selectedOption == option"
                                     (onClick)="onItemClick($event)"
                                     [template]="itemTemplate"></app-dropdown-item>
                </ng-template>
              </ng-container>
              <ng-template #virtualScrollList>
                <cdk-virtual-scroll-viewport (scrolledIndexChange)="scrollToSelectedVirtualScrollElement()" #viewport
                                             [ngStyle]="{'height': scrollHeight}" [itemSize]="itemSize"
                                             *ngIf="virtualScroll && optionsToDisplay && optionsToDisplay.length">
                  <ng-container
                    *cdkVirtualFor="let option of options;
                     let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd">
                    <app-dropdown-item [option]="option" [selected]="selectedOption == option"
                                       (onClick)="onItemClick($event)"
                                       [template]="itemTemplate"></app-dropdown-item>
                  </ng-container>
                </cdk-virtual-scroll-viewport>
              </ng-template>
            </ng-template>
            <li *ngIf="filter && optionsToDisplay && optionsToDisplay.length === 0"
                class="ui-dropdown-empty-message">{{emptyFilterMessage}}</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('overlayAnimation', [
      state('void', style({
        transform: 'translateY(5%)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('void => visible', animate('{{showTransitionParams}}')),
      transition('visible => void', animate('{{hideTransitionParams}}'))
    ])
  ],
  host: {
    '[class.ui-inputwrapper-filled]': 'filled',
    '[class.ui-inputwrapper-focus]': 'focused'
  },
  providers: [DROPDOWN_VALUE_ACCESSOR]
})
export class DropdownComponent implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy, ControlValueAccessor {

  @Input() get disabled(): boolean {
    return this._disabled;
  }

  set disabled(_disabled: boolean) {
    if (_disabled) {
      this.focused = false;
    }

    this._disabled = _disabled;
    if (!(this.cd as ViewRef).destroyed) {
      this.cd.detectChanges();
    }
  }

  constructor(public el: ElementRef, public renderer: Renderer2, private cd: ChangeDetectorRef, public zone: NgZone) {
  }

  @Input() get options(): any[] {
    return this._options;
  }

  set options(val: any[]) {
    const opts = this.optionLabel ? ObjectUtils.generateSelectItems(val, this.optionLabel) : val;
    this._options = opts;
    this.optionsToDisplay = this._options;
    this.updateSelectedOption(this.value);
    this.optionsChanged = true;

    if (this.filterValue && this.filterValue.length) {
      this.activateFilter();
    }
  }

  get label(): string {
    return (this.selectedOption ? this.selectedOption.label : null);
  }

  @Input() scrollHeight = '200px';

  @Input() filter: boolean;

  @Input() name: string;

  @Input() style: any;

  @Input() panelStyle: any;

  @Input() styleClass: string;

  @Input() panelStyleClass: string;

  @Input() readonly: boolean;

  @Input() required: boolean;

  @Input() editable: boolean;

  @Input() appendTo: any;

  @Input() tabindex: number;

  @Input() placeholder: string;

  @Input() filterPlaceholder: string;

  @Input() inputId: string;

  @Input() selectId: string;

  @Input() dataKey: string;

  @Input() filterBy = 'label';

  @Input() autofocus: boolean;

  @Input() resetFilterOnHide = false;

  @Input() dropdownIcon = 'pi pi-chevron-down';

  @Input() optionLabel: string;

  @Input() autoDisplayFirst = true;

  @Input() group: boolean;

  @Input() showClear: boolean;

  @Input() emptyFilterMessage = 'No results found';

  @Input() virtualScroll: boolean;

  @Input() itemSize: number;

  @Input() autoZIndex = true;

  @Input() baseZIndex = 0;

  @Input() showTransitionOptions = '225ms ease-out';

  @Input() hideTransitionOptions = '195ms ease-in';

  @Input() ariaFilterLabel: string;

  @Input() filterMatchMode = 'contains';

  @Input() maxlength: number;

  @Input() tooltip = '';

  @Input() tooltipPosition = 'right';

  @Input() tooltipPositionStyle = 'absolute';

  @Input() tooltipStyleClass: string;

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  @Output() onFocus: EventEmitter<any> = new EventEmitter();

  @Output() onBlur: EventEmitter<any> = new EventEmitter();

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  @Output() onShow: EventEmitter<any> = new EventEmitter();

  @Output() onHide: EventEmitter<any> = new EventEmitter();

  @ViewChild('container', {static: true}) containerViewChild: ElementRef;

  @ViewChild('filter', {static: false}) filterViewChild: ElementRef;

  @ViewChild('in', {static: true}) focusViewChild: ElementRef;

  @ViewChild(CdkVirtualScrollViewport, {static: false}) viewPort: CdkVirtualScrollViewport;

  @ViewChild('editableInput', {static: false}) editableInputViewChild: ElementRef;

  @ContentChildren(PrimeTemplate) templates: QueryList<any>;

  private _disabled: boolean;

  overlay: HTMLDivElement;

  itemsWrapper: HTMLDivElement;

  itemTemplate: TemplateRef<any>;

  groupTemplate: TemplateRef<any>;

  selectedItemTemplate: TemplateRef<any>;

  selectedOption: any;

  _options: any[];

  value: any;

  optionsToDisplay: any[];

  hover: boolean;

  focused: boolean;

  filled: boolean;

  overlayVisible: boolean;

  documentClickListener: any;

  optionsChanged: boolean;

  panel: HTMLDivElement;

  dimensionsUpdated: boolean;

  selfClick: boolean;

  itemClick: boolean;

  clearClick: boolean;

  hoveredItem: any;

  selectedOptionUpdated: boolean;

  filterValue: string;

  searchValue: string;

  searchIndex: number;

  searchTimeout: any;

  previousSearchChar: string;

  currentSearchChar: string;

  documentResizeListener: any;

  virtualAutoScrolled: boolean;

  virtualScrollSelectedIndex: number;

  viewPortOffsetTop = 0;

  onModelChange: Function = () => {
  }

  onModelTouched: Function = () => {
  }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'item':
          this.itemTemplate = item.template;
          break;

        case 'selectedItem':
          this.selectedItemTemplate = item.template;
          break;

        case 'group':
          this.groupTemplate = item.template;
          break;

        default:
          this.itemTemplate = item.template;
          break;
      }
    });
  }

  ngOnInit() {
    this.optionsToDisplay = this.options;
    this.updateSelectedOption(null);
  }

  ngAfterViewInit() {
    if (this.editable) {
      this.updateEditableLabel();
    }
  }

  updateEditableLabel(): void {
    if (this.editableInputViewChild && this.editableInputViewChild.nativeElement) {
      this.editableInputViewChild.nativeElement.value = (this.selectedOption ? this.selectedOption.label : this.value || '');
    }
  }

  onItemClick(event) {
    const option = event.option;
    this.itemClick = true;

    if (!option.disabled) {
      this.selectItem(event, option);
      this.focusViewChild.nativeElement.focus();
    }

    setTimeout(() => {
      this.hide(event);
    }, 150);
  }

  selectItem(event, option) {
    if (this.selectedOption != option) {
      this.selectedOption = option;
      this.value = option.value;
      this.filled = true;

      this.onModelChange(this.value);
      this.updateEditableLabel();
      this.onChange.emit({
        originalEvent: event.originalEvent,
        value: this.value
      });

      if (this.virtualScroll) {
        setTimeout(() => {
          this.viewPortOffsetTop = this.viewPort.measureScrollOffset();
        }, 1);
      }
    }
  }

  ngAfterViewChecked() {
    if (this.optionsChanged && this.overlayVisible) {
      this.optionsChanged = false;

      if (this.virtualScroll) {
        this.updateVirtualScrollSelectedIndex(true);
      }

      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.alignOverlay();
        }, 1);
      });
    }

    if (this.selectedOptionUpdated && this.itemsWrapper) {
      if (this.virtualScroll && this.viewPort) {
        const range = this.viewPort.getRenderedRange();
        this.updateVirtualScrollSelectedIndex(false);

        if (range.start > this.virtualScrollSelectedIndex || range.end < this.virtualScrollSelectedIndex) {
          this.viewPort.scrollToIndex(this.virtualScrollSelectedIndex);
        }
      }

      const selectedItem = DomHandler.findSingle(this.overlay, 'li.ui-state-highlight');
      if (selectedItem) {
        DomHandler.scrollInView(this.itemsWrapper, DomHandler.findSingle(this.overlay, 'li.ui-state-highlight'));
      }
      this.selectedOptionUpdated = false;
    }
  }

  writeValue(value: any): void {
    if (this.filter) {
      this.resetFilter();
    }

    this.value = value;
    this.updateSelectedOption(value);
    this.updateEditableLabel();
    this.updateFilledState();
    this.cd.markForCheck();
  }

  resetFilter(): void {
    this.filterValue = null;

    if (this.filterViewChild && this.filterViewChild.nativeElement) {
      this.filterViewChild.nativeElement.value = '';
    }

    this.optionsToDisplay = this.options;
  }

  updateSelectedOption(val: any): void {
    this.selectedOption = this.findOption(val, this.optionsToDisplay);
    if (this.autoDisplayFirst && !this.placeholder
      && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
      this.selectedOption = this.optionsToDisplay[0];
    }
    this.selectedOptionUpdated = true;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
  }

  onMouseclick(event) {
    if (this.disabled || this.readonly) {
      return;
    }

    this.onClick.emit(event);

    this.selfClick = true;
    this.clearClick = DomHandler.hasClass(event.target, 'ui-dropdown-clear-icon');

    if (!this.itemClick && !this.clearClick) {
      this.focusViewChild.nativeElement.focus();

      if (this.overlayVisible) {
        this.hide(event);
      } else {
        this.show();
      }

      this.cd.detectChanges();
    }
  }

  onEditableInputClick(event) {
    this.itemClick = true;
    this.bindDocumentClickListener();
  }

  onEditableInputFocus(event) {
    this.focused = true;
    this.hide(event);
    this.onFocus.emit(event);
  }

  onEditableInputChange(event) {
    this.value = event.target.value;
    this.updateSelectedOption(this.value);
    this.onModelChange(this.value);
    this.onChange.emit({
      originalEvent: event,
      value: this.value
    });
  }

  show() {
    this.overlayVisible = true;
  }

  onOverlayAnimationStart(event: AnimationEvent) {
    switch (event.toState) {
      case 'visible':
        this.overlay = event.element;
        const itemsWrapperSelector = this.virtualScroll ? '.cdk-virtual-scroll-viewport' : '.ui-dropdown-items-wrapper';
        this.itemsWrapper = DomHandler.findSingle(this.overlay, itemsWrapperSelector);
        this.appendOverlay();
        if (this.autoZIndex) {
          this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
        this.alignOverlay();
        this.bindDocumentClickListener();
        this.bindDocumentResizeListener();

        if (this.options && this.options.length) {
          if (!this.virtualScroll) {
            const selectedListItem = DomHandler.findSingle(this.itemsWrapper, '.ui-dropdown-item.ui-state-highlight');
            if (selectedListItem) {
              DomHandler.scrollInView(this.itemsWrapper, selectedListItem);
            }
          }
        }

        if (this.filterViewChild && this.filterViewChild.nativeElement) {
          this.filterViewChild.nativeElement.focus();
        }

        this.onShow.emit(event);
        break;

      case 'void':
        this.onOverlayHide();
        break;
    }
  }

  scrollToSelectedVirtualScrollElement() {
    if (!this.virtualAutoScrolled) {
      if (this.viewPortOffsetTop) {
        this.viewPort.scrollToOffset(this.viewPortOffsetTop);
      } else if (this.virtualScrollSelectedIndex > -1) {
        this.viewPort.scrollToIndex(this.virtualScrollSelectedIndex);
      }
    }

    this.virtualAutoScrolled = true;
  }

  updateVirtualScrollSelectedIndex(resetOffset) {
    if (this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length) {
      if (resetOffset) {
        this.viewPortOffsetTop = 0;
      }

      this.virtualScrollSelectedIndex = this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay);
    }
  }

  appendOverlay() {
    if (this.appendTo) {
      if (this.appendTo === 'body') {
        document.body.appendChild(this.overlay);
      } else {
        DomHandler.appendChild(this.overlay, this.appendTo);
      }

      this.overlay.style.minWidth = DomHandler.getWidth(this.containerViewChild.nativeElement) + 'px';
    }
  }

  restoreOverlayAppend() {
    if (this.overlay && this.appendTo) {
      this.el.nativeElement.appendChild(this.overlay);
    }
  }

  hide(event) {
    this.overlayVisible = false;

    if (this.filter && this.resetFilterOnHide) {
      this.resetFilter();
    }

    if (this.virtualScroll) {
      this.virtualAutoScrolled = false;
    }

    this.cd.markForCheck();
    this.onHide.emit(event);
  }

  alignOverlay() {
    if (this.overlay) {
      if (this.appendTo) {
        DomHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
      } else {
        DomHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
      }
    }
  }

  onInputFocus(event) {
    this.focused = true;
    this.onFocus.emit(event);
  }

  onInputBlur(event) {
    this.focused = false;
    this.onModelTouched();
    this.onBlur.emit(event);
  }

  findPrevEnabledOption(index) {
    let prevEnabledOption;

    if (this.optionsToDisplay && this.optionsToDisplay.length) {
      for (let i = (index - 1); 0 <= i; i--) {
        const option = this.optionsToDisplay[i];
        if (option.disabled) {
          continue;
        } else {
          prevEnabledOption = option;
          break;
        }
      }

      if (!prevEnabledOption) {
        for (let i = this.optionsToDisplay.length - 1; i >= index; i--) {
          const option = this.optionsToDisplay[i];
          if (option.disabled) {
            continue;
          } else {
            prevEnabledOption = option;
            break;
          }
        }
      }
    }

    return prevEnabledOption;
  }

  findNextEnabledOption(index) {
    let nextEnabledOption;

    if (this.optionsToDisplay && this.optionsToDisplay.length) {
      for (let i = (index + 1); index < (this.optionsToDisplay.length - 1); i++) {
        const option = this.optionsToDisplay[i];
        if (option.disabled) {
          continue;
        } else {
          nextEnabledOption = option;
          break;
        }
      }

      if (!nextEnabledOption) {
        for (let i = 0; i < index; i++) {
          const option = this.optionsToDisplay[i];
          if (option.disabled) {
            continue;
          } else {
            nextEnabledOption = option;
            break;
          }
        }
      }
    }

    return nextEnabledOption;
  }

  onKeydown(event: KeyboardEvent, search: boolean) {
    if (this.readonly || !this.optionsToDisplay || this.optionsToDisplay.length === null) {
      return;
    }

    switch (event.which) {
      // down
      case 40:
        if (!this.overlayVisible && event.altKey) {
          this.show();
        } else {
          if (this.group) {
            const selectedItemIndex = this.selectedOption ?
              this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay)
              : -1;

            if (selectedItemIndex !== -1) {
              const nextItemIndex = selectedItemIndex.itemIndex + 1;
              if (nextItemIndex < (this.optionsToDisplay[selectedItemIndex.groupIndex].items.length)) {
                this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex].items[nextItemIndex]);
                this.selectedOptionUpdated = true;
              } else if (this.optionsToDisplay[selectedItemIndex.groupIndex + 1]) {
                this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex + 1].items[0]);
                this.selectedOptionUpdated = true;
              }
            } else {
              this.selectItem(event, this.optionsToDisplay[0].items[0]);
            }
          } else {
            const selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
            const nextEnabledOption = this.findNextEnabledOption(selectedItemIndex);
            if (nextEnabledOption) {
              this.selectItem(event, nextEnabledOption);
              this.selectedOptionUpdated = true;
            }
          }
        }

        event.preventDefault();

        break;

      // up
      case 38:
        if (this.group) {
          const selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
          if (selectedItemIndex !== -1) {
            const prevItemIndex = selectedItemIndex.itemIndex - 1;
            if (prevItemIndex >= 0) {
              this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex].items[prevItemIndex]);
              this.selectedOptionUpdated = true;
            } else if (prevItemIndex < 0) {
              const prevGroup = this.optionsToDisplay[selectedItemIndex.groupIndex - 1];
              if (prevGroup) {
                this.selectItem(event, prevGroup.items[prevGroup.items.length - 1]);
                this.selectedOptionUpdated = true;
              }
            }
          }
        } else {
          const selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
          const prevEnabledOption = this.findPrevEnabledOption(selectedItemIndex);
          if (prevEnabledOption) {
            this.selectItem(event, prevEnabledOption);
            this.selectedOptionUpdated = true;
          }
        }

        event.preventDefault();
        break;

      // space
      case 32:
      case 32:
        if (!this.overlayVisible) {
          this.show();
          event.preventDefault();
        }
        break;

      // enter
      case 13:
        if (!this.filter || (this.optionsToDisplay && this.optionsToDisplay.length > 0)) {
          this.hide(event);
        }

        event.preventDefault();
        break;

      // escape and tab
      case 27:
      case 9:
        this.hide(event);
        break;

      // search item based on keyboard input
      default:
        if (search) {
          this.search(event);
        }
        break;
    }
  }

  search(event) {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    const char = event.key;
    this.previousSearchChar = this.currentSearchChar;
    this.currentSearchChar = char;

    if (this.previousSearchChar === this.currentSearchChar) {
      this.searchValue = this.currentSearchChar;
    } else {
      this.searchValue = this.searchValue ? this.searchValue + char : char;
    }

    let newOption;
    if (this.group) {
      const searchIndex = this.selectedOption ?
        this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) :
        {groupIndex: 0, itemIndex: 0};
      newOption = this.searchOptionWithinGroup(searchIndex);
    } else {
      let searchIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
      newOption = this.searchOption(++searchIndex);
    }

    if (newOption) {
      this.selectItem(event, newOption);
      this.selectedOptionUpdated = true;
    }

    this.searchTimeout = setTimeout(() => {
      this.searchValue = null;
    }, 250);
  }

  searchOption(index) {
    let option;

    if (this.searchValue) {
      option = this.searchOptionInRange(index, this.optionsToDisplay.length);

      if (!option) {
        option = this.searchOptionInRange(0, index);
      }
    }

    return option;
  }

  searchOptionInRange(start, end) {
    for (let i = start; i < end; i++) {
      const opt = this.optionsToDisplay[i];
      if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
        return opt;
      }
    }

    return null;
  }

  searchOptionWithinGroup(index) {
    let option;

    if (this.searchValue) {
      for (let i = index.groupIndex; i < this.optionsToDisplay.length; i++) {
        for (let j = (index.groupIndex === i) ? (index.itemIndex + 1) : 0; j < this.optionsToDisplay[i].items.length; j++) {
          const opt = this.optionsToDisplay[i].items[j];
          if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
            return opt;
          }
        }
      }

      if (!option) {
        for (let i = 0; i <= index.groupIndex; i++) {
          for (let j = 0; j < ((index.groupIndex === i) ? index.itemIndex : this.optionsToDisplay[i].items.length); j++) {
            const opt = this.optionsToDisplay[i].items[j];
            if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
              return opt;
            }
          }
        }
      }
    }

    return null;
  }

  findOptionIndex(val: any, opts: any[]): number {
    let index = -1;
    if (opts) {
      for (let i = 0; i < opts.length; i++) {
        if ((val == null && opts[i].value == null) || ObjectUtils.equals(val, opts[i].value, this.dataKey)) {
          index = i;
          break;
        }
      }
    }

    return index;
  }

  findOptionGroupIndex(val: any, opts: any[]): any {
    let groupIndex, itemIndex;

    if (opts) {
      for (let i = 0; i < opts.length; i++) {
        groupIndex = i;
        itemIndex = this.findOptionIndex(val, opts[i].items);

        if (itemIndex !== -1) {
          break;
        }
      }
    }

    if (itemIndex !== -1) {
      return {groupIndex, itemIndex};
    } else {
      return -1;
    }
  }

  findOption(val: any, opts: any[], inGroup?: boolean): SelectItem {
    if (this.group && !inGroup) {
      let opt: SelectItem;
      if (opts && opts.length) {
        for (const optgroup of opts) {
          opt = this.findOption(val, optgroup.items, true);
          if (opt) {
            break;
          }
        }
      }
      return opt;
    } else {
      const index: number = this.findOptionIndex(val, opts);
      return (index != -1) ? opts[index] : null;
    }
  }

  onFilter(event): void {
    const inputValue = event.target.value;
    if (inputValue && inputValue.length) {
      this.filterValue = inputValue;
      this.activateFilter();
    } else {
      this.filterValue = null;
      this.optionsToDisplay = this.options;
    }

    this.optionsChanged = true;
  }

  activateFilter() {
    const searchFields: string[] = this.filterBy.split(',');

    if (this.options && this.options.length) {
      if (this.group) {
        const filteredGroups = [];
        for (const optgroup of this.options) {
          const filteredSubOptions = FilterUtils.filter(optgroup.items, searchFields, this.filterValue, this.filterMatchMode);
          if (filteredSubOptions && filteredSubOptions.length) {
            filteredGroups.push({
              label: optgroup.label,
              value: optgroup.value,
              items: filteredSubOptions
            });
          }
        }

        this.optionsToDisplay = filteredGroups;
      } else {
        this.optionsToDisplay = FilterUtils.filter(this.options, searchFields, this.filterValue, this.filterMatchMode);
      }

      this.optionsChanged = true;
    }
  }

  applyFocus(): void {
    if (this.editable) {
      DomHandler.findSingle(this.el.nativeElement, '.ui-dropdown-label.ui-inputtext').focus();
    } else {
      DomHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
    }
  }

  focus(): void {
    this.applyFocus();
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
        if (!this.selfClick && !this.itemClick) {
          this.hide(event);
          this.unbindDocumentClickListener();
        }

        this.clearClickState();
        this.cd.markForCheck();
      });
    }
  }

  clearClickState() {
    this.selfClick = false;
    this.itemClick = false;
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  bindDocumentResizeListener() {
    this.documentResizeListener = this.onWindowResize.bind(this);
    window.addEventListener('resize', this.documentResizeListener);
  }

  unbindDocumentResizeListener() {
    if (this.documentResizeListener) {
      window.removeEventListener('resize', this.documentResizeListener);
      this.documentResizeListener = null;
    }
  }

  onWindowResize() {
    if (!DomHandler.isAndroid()) {
      this.hide(event);
    }
  }

  updateFilledState() {
    this.filled = (this.selectedOption != null);
  }

  clear(event: Event) {
    this.clearClick = true;
    this.value = null;
    this.onModelChange(this.value);
    this.onChange.emit({
      originalEvent: event,
      value: this.value
    });
    this.updateSelectedOption(this.value);
    this.updateEditableLabel();
    this.updateFilledState();
  }

  onOverlayHide() {
    this.unbindDocumentClickListener();
    this.unbindDocumentResizeListener();
    this.overlay = null;
    this.itemsWrapper = null;
  }

  ngOnDestroy() {
    this.restoreOverlayAppend();
    this.onOverlayHide();
  }
}

@NgModule({
  imports: [CommonModule, SharedModule, ScrollingModule, TooltipModule],
  exports: [DropdownComponent, SharedModule, ScrollingModule],
  declarations: [DropdownComponent, DropdownItemComponent]
})
export class DropdownModule {
}
