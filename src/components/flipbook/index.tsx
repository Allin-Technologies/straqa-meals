import React, {
  ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { FlippingState, PageFlip } from "page-flip";
import { IFlipSetting, IEventProps } from "./settings";

interface IProps extends IFlipSetting, IEventProps {
  className: string;
  style: React.CSSProperties;
  children: React.ReactNode;
  renderOnlyPageLengthChange?: boolean;
}

const HTMLFlipBookForward = React.forwardRef(
  // @ts-ignore
  (props: IProps, ref: React.MutableRefObject<PageFlip>) => {
    const htmlElementRef = useRef<HTMLDivElement>(null);
    const childRef = useRef<HTMLElement[]>([]);
    // @ts-ignore
    const pageFlip = useRef<PageFlip>();

    const [pages, setPages] = useState<ReactElement[]>([]);

    // @ts-ignore
    useImperativeHandle(ref, () => {
      return {
        flipNext: () => pageFlip?.current?.flipNext(),
        flipPrev: () => pageFlip?.current?.flipPrev(),
      };
    });

    const refreshOnPageDelete = useCallback(() => {
      if (pageFlip.current) {
        // @ts-ignore
        pageFlip.current.clear();
      }
    }, []);

    const removeHandlers = useCallback(() => {
      const flip = pageFlip.current;

      if (flip) {
        flip.off("flip");
        flip.off("changeOrientation");
        flip.off("changeState");
        flip.off("init");
        flip.off("update");
      }
    }, []);

    useEffect(() => {
      childRef.current = [];

      if (props.children) {
        const childList = React.Children.map(props.children, (child) => {
          return React.cloneElement(child as ReactElement, {
            // @ts-ignore
            ref: (dom) => {
              if (dom) {
                childRef.current.push(dom);
              }
            },
          });
        });

        if (
          !props.renderOnlyPageLengthChange ||
          // @ts-ignore
          pages.length !== childList.length
        ) {
          // @ts-ignore
          if (childList.length < pages.length) {
            refreshOnPageDelete();
          }

          // @ts-ignore
          setPages(childList);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.children]);

    useEffect(() => {
      const setHandlers = () => {
        const flip = pageFlip.current;

        if (flip) {
          if (props.onFlip) {
            // @ts-ignore
            flip.on("flip", (e: unknown) => props.onFlip(e));
          }

          if (props.onChangeOrientation) {
            flip.on("changeOrientation", (e: unknown) =>
              // @ts-ignore
              props.onChangeOrientation(e)
            );
          }

          if (props.onChangeState) {
            // @ts-ignore
            flip.on("changeState", (e: unknown) => props.onChangeState(e));
          }

          if (props.onInit) {
            // @ts-ignore
            flip.on("init", (e: unknown) => props.onInit(e));
          }

          if (props.onUpdate) {
            // @ts-ignore
            flip.on("update", (e: unknown) => props.onUpdate(e));
          }
        }
      };

      if (pages.length > 0 && childRef.current.length > 0) {
        removeHandlers();

        if (htmlElementRef.current && !pageFlip.current) {
          // @ts-ignore
          pageFlip.current = new PageFlip(htmlElementRef.current, props);
        }

        if (!pageFlip.current.getFlipController()) {
          pageFlip.current.loadFromHTML(childRef.current);
        } else {
          pageFlip.current.updateFromHtml(childRef.current);
        }

        setHandlers();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pages]);

    return (
      <div ref={htmlElementRef} className={props.className} style={props.style}>
        {pages}
      </div>
    );
  }
);

export const HTMLFlipBook = React.memo(HTMLFlipBookForward);
